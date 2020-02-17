# DevOps 101

## Getting Started

Ensure that you have the following installed:

* Docker
* Docker-Compose

## Using The Repository

Import the existing Jenkins and GitLab configurations first:

```bash
docker-compose -f data-import.yml up
```

Then run the following command to start the environment:

```bash
docker-compose up -d
```

The Jenkins service will start on `http://localhost:3000`. The default login is:

* admin
* admin

The GitLab service will start on `http://localhost:80`. It may take a few seconds to startup (run `docker ps` to check the container's status). The default login is:

* root
* admin123

## Extracting data out from environment

Run the following command:

```bash
docker-compose -f data-export.yml up
```

Note that this will overwrite any existing tar files in the `/data` directory.
