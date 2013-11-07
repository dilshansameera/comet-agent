comet-agent [![Build Status](https://travis-ci.org/meteorhacks/comet-agent.png)](https://travis-ci.org/meteorhacks/comet-agent)
===========

Server monitoring helper

##Logging Service Manager
Logging Service Manager takes care of tailing log files and sending them to particular services. (papertrail,spunkstorm)

##Metrics Service Manager
takes care of  tracking metrics and sending them to particular services. (librato)

###usage
comet-agent ./config.json

####config.json

```javascript
{
    "logs": {
        "logFiles": {
            "haproxy": "/tmp/log/haproxy.log",
            "app": "/tmp/log/app.log"
        },
        "services": {
            "papertrail": {
                "host": "logs.papertrailapp.com",
                "port": PAPERTAIL_PORT
            },
            "splunkstorm": {
                "apiKey": "YOUR_SPLUNKSTORM_API_KEY",
                "projectId": "YOUR_PROJECT_ID"
            }
        },
        "watchFileInterval": 1000
    },
    "metrics": {
        "providers": {
            "system": {
                "interval": 2000
            }
        },
        "services": {
            "librato": {
                "email": "YOUR_EMAIL",
                "token": "YOUR_LIBRATO_TOKEN"
            }
        }
    }
}
```
