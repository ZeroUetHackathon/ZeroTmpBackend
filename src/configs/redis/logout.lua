local sub = string.sub
local call = redis.call

local token_key, blacklist_key = unpack(KEYS)

local refresh_token = ARGV[1]
-- Get session's info
local session = call("ZRANGEBYSCORE", token_key, refresh_token, refresh_token)[1]

if session then
	local session_id = sub(session, 1, 19)
	local user_id = sub(session, 20, 43)
	local session_device = sub(session, 44, -1)

	-- Remove refresh Token
	call("ZREMRANGEBYSCORE", token_key, refresh_token, refresh_token)

	-- Set it to the blacklist
	call('ZADD', blacklist_key, refresh_token, session_id..refresh_token)
	return {session_id, user_id, session_device}
end
