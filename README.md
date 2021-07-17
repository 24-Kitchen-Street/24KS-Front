# 24KS Front End

- `yarn start` - starts local app, connects to heroku server
- `yarn dev` - starts local app, connects to local server (you must start this locally, on the other repo)

# Local env vars

You'll need to create an `.env.local` file with in the root of the project with some variables. Example file:

```
REACT_APP_SOCKET_URI=https://club-geist.herokuapp.com
```

# Admin

Add `?admin=1` to the URL to bring up admin controls. When no environment var is set, password defaults to "dev".

# Testing errors

- When sending a chat message, you can send "test-error-1" to emulate a server error
