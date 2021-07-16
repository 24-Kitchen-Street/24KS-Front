# 24KS Front End

- `yarn start` - starts local app, connects to heroku server
- `yarn dev` - starts local app, connects to local server (you must start this locally, on the other repo)

# Testing a stream

You'll need a `.env` file in the root of the project to test your own stream URL. It should look like this:

```
REACT_APP_STREAM_URL=https://mystreamURL.m3u8
```

If this environment variable isn't set up, a fallback test stream URL is used

# Admin

Add `?admin=1` to the URL to bring up admin controls. When no environment var is set, password defaults to "dev".

# Testing errors

- When sending a chat message, you can send "test-error-1" to emulate a server error
