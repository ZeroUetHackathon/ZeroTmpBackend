local call = redis.call

local key, expired_value = unpack(KEYS)
call('ZREMRANGEBYSCORE', key, '-inf', '['..expired_value)

if #ARGV == 1 then
	local refresh_token = ARGV[1]
	local session_id = call('ZRANGEBYSCORE', key, refresh_token, refresh_token)[1]
	-- Blacklist the refreshToken is using by this session
	if session_id ~= "" then
		local illegal_refresh_token = call("ZSCAN", key, 0, "MATCH "..session_id.."*")[2][2]
		call('ZADD', key, illegal_refresh_token, session_id..illegal_refresh_token)
	end
	-- Return to throw API ERROR
	return session_id == ""
end
