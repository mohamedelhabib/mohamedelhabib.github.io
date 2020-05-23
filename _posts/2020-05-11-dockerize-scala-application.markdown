---
layout: post
title:  "Dockerize your Scala application"
date:   2020-05-11 06:35:00 +0200
tags: [Scala, Docker compose, Docker] 
menu: true
toc: true
---

## Create a hello world project

to create a new scala project you can use this command `sbt new scala/hello-world.g8`. This require to have sbt already installed.

```shell
$ sbt new scala/hello-world.g8
```
Use `hello-world` as application name.

This will generate the following tree
```shell
$ tree hello-world/
hello-world/
├── build.sbt
├── project
│   └── build.properties
└── src
    └── main
        └── scala
            └── Main.scala
```

## Run the hello world project

```shell
$ sbt run

[info] [launcher] getting org.scala-sbt sbt 1.3.2  (this may take some time)...
downloading https://repo1.maven.org/maven2/org/scala-sbt/sbt/1.3.2/sbt-1.3.2.jar ...
...
...
[info]   Compilation completed in 8.27s.
[info] running Main 
Hello, World!
```

## Package the application

The `JavaAppPackaging` archetype from `sbt-native-packager` provides a default application structure and executable scripts to launch your application.

Add the `sbt-native-packager` to your `plugins.sbt` (Create a new one under project folder) 
```
addSbtPlugin("com.typesafe.sbt" % "sbt-native-packager" % "1.7.1")
```

Enable the JavaAppPackaging plugin in your `build.sbt` with
```
enablePlugins(JavaAppPackaging)
```

This can be done using the following command.
```shell
$ sbt stage
```

The result is available under `target/universal/stage`
```shell
$ tree ./target/universal/stage/
./target/universal/stage/
├── bin
│   ├── hello-world
│   └── hello-world.bat
└── lib
    ├── ch.epfl.scala.hello-world-1.0.jar
    ├── org.scala-lang.scala-library-2.13.1.jar
    ├── org.typelevel.cats-core_2.13-2.0.0.jar
    ├── org.typelevel.cats-kernel_2.13-2.0.0.jar
    └── org.typelevel.cats-macros_2.13-2.0.0.jar
```

Test the generated script
```shell
$ bash ./target/universal/stage/bin/hello-world
Hello, World!
```
The usage below show some useful option already available into generated script, like :
- verbose and debug options
- a multi main class support
- selection of java version to use
- JVM options

```shell
$ bash target/universal/stage/bin/hello-world -h
Usage:  [options]

  -h | -help         print this message
  -v | -verbose      this runner is chattier
  -d | -debug        enable debug output for the launcher script
  -no-version-check  Don t run the java version check.
  -main <classname>  Define a custom main class
  -jvm-debug <port>  Turn on JVM debugging, open at the given port.

  # java version (default: java from PATH, currently openjdk version "11.0.7" 2020-04-14)
  -java-home <path>         alternate JAVA_HOME

  # jvm options and output control
  JAVA_OPTS          environment variable, if unset uses ""
  -Dkey=val          pass -Dkey=val directly to the java runtime
  -J-X               pass option -X directly to the java runtime
                     (-J is stripped)

  # special option
  --                 To stop parsing built-in commands from the rest of the command-line.
                     e.g.) enabling debug and sending -d as app argument
                     $ ./start-script -d -- -d

In the case of duplicated or conflicting options, basically the order above
shows precedence: JAVA_OPTS lowest, command line options highest except "--".
Available main classes:
	Main

```

## Generate a docker image for the application

The `Docker Plugin` from `sbt-native-packager` implement the following features
- generate a Dockerfile based on `JavaAppPackaging` archetype stage.
- sbt integration to build the docker image

Enable the Docker Plugin in your `build.sbt` with
```
enablePlugins(DockerPlugin)
```
Run this command to generate a Dockerfile
```shell
$ sbt docker:stage
```
You can see into below the tree of generated files
- stage 1 : script and dependencies lib
- stage 2 : the application jar
- the Dockerfile

```shell
$ tree target/docker/stage/
target/docker/stage/
├── 1
│   └── opt
│       └── docker
│           ├── bin
│           │   ├── hello-world
│           │   └── hello-world.bat
│           └── lib
│               ├── org.scala-lang.scala-library-2.13.1.jar
│               ├── org.typelevel.cats-core_2.13-2.0.0.jar
│               ├── org.typelevel.cats-kernel_2.13-2.0.0.jar
│               └── org.typelevel.cats-macros_2.13-2.0.0.jar
├── 2
│   └── opt
│       └── docker
│           └── lib
│               └── ch.epfl.scala.hello-world-1.0.jar
└── Dockerfile

9 directories, 8 files
```
Let's comment the content of the Dockerfile
```docker
$ more target/docker/stage/Dockerfile 
# A multi stage Dockerfile
# the first stage named `stage0` based on `openjdk:8`
FROM openjdk:8 as stage0
# some meta data
LABEL snp-multi-stage="intermediate"
LABEL snp-multi-stage-id="2240a3f8-0c82-46f2-8c84-fdd8d43c83f0"
# change to /opt/docker folder
WORKDIR /opt/docker
# copy target/docker/stage/1/opt from host to /1/opt into container
COPY 1/opt /1/opt
# copy target/docker/stage/2/opt from host to /2/opt into container
COPY 2/opt /2/opt
# run following command as `root`
USER root
# make /1/opt/docker read only
RUN ["chmod", "-R", "u=rX,g=rX", "/1/opt/docker"]
# make /2/opt/docker read only
RUN ["chmod", "-R", "u=rX,g=rX", "/2/opt/docker"]
# add execution right to the generated script 
RUN ["chmod", "u+x,g+x", "/1/opt/docker/bin/hello-world"]

# the second stage named `mainstage` based also on `openjdk:8`
FROM openjdk:8 as mainstage
USER root
# create a demiourgos728 user with id 1001
RUN id -u demiourgos728 1>/dev/null 2>&1 || (( getent group 0 1>/dev/null 2>&1 || ( type groupadd 1>/dev/null 2>&1 && groupadd -g 0 root || addgroup -g 0 -S root )) && ( type useradd 1>/dev/null 2>&1 && 
useradd --system --create-home --uid 1001 --gid 0 demiourgos728 || adduser -S -u 1001 -G root demiourgos728 ))
WORKDIR /opt/docker
# copy the content of /1/opt/docker and /2/opt/docker from stage0 into /opt/docker of the mainstage
COPY --from=stage0 --chown=demiourgos728:root /1/opt/docker /opt/docker
COPY --from=stage0 --chown=demiourgos728:root /2/opt/docker /opt/docker
# use the created user to run the final docker image
USER 1001:0
# set the hello-world script as an entrypoint of the final docker image
ENTRYPOINT ["/opt/docker/bin/hello-world"]
CMD []
```

To build the docker image run the following command
```shell
$ sbt docker:publishLocal
```
The result is a docker image named with the same name as the project and with the same version as the project.
```shell
$ docker image ls
REPOSITORY                  TAG                     IMAGE ID            CREATED             SIZE
hello-world                 1.0                     e2585c330c0c        29 seconds ago      525MB
```
Launch this command to test
```
$ docker run --rm -ti hello-world:1.0
Hello, World!
```

## Optimise the docker image

The generated docker image have 525MB, let try to optimise this size.
The docker history give as the size of each layer. Here we use grep to get only layer that the size is above or equals 1MB.
The third column of this output show the Dockerfile command that generate this layer.
If we check the Dockerfile we can see that only the first command `COPY --chown=demiourgos728` is present.
The other command come from the `openjdk:8` base image 
```shell
$ docker history hello-world:1.0 | grep MB
c4658e3633a0        10 minutes ago      /bin/sh -c #(nop) COPY --chown=demiourgos728…   13.9MB              
6cedfea72886        2 weeks ago         /bin/sh -c set -eux;   dpkgArch="$(dpkg --pr…   206MB               
<missing>           2 weeks ago         /bin/sh -c set -eux;  apt-get update;  apt-g…   11.1MB              
<missing>           2 weeks ago         /bin/sh -c apt-get update && apt-get install…   146MB               
<missing>           2 weeks ago         /bin/sh -c set -ex;  if ! command -v gpg > /…   17.5MB              
<missing>           2 weeks ago         /bin/sh -c apt-get update && apt-get install…   16.5MB              
<missing>           2 weeks ago         /bin/sh -c #(nop) ADD file:f086177965196842a…   114MB
```

In fact `openjdk:8` base image have 510MB as size

```shell
$ docker image ls | grep openjdk | grep "8 "
openjdk                     8                       6cedfea72886        2 weeks ago         510MB
```
Below a list of some openjdk image and we can see that `adoptopenjdk` jre version the smallest one
```
$ docker image ls | grep openjdk | grep "jdk" | sort -h -k7
adoptopenjdk                11.0.7_10-jre-hotspot   015147d37319        2 weeks ago         227MB
openjdk                     11.0.7-jre              faf75cb9edb2        2 weeks ago         285MB
adoptopenjdk                11.0.7_10-jdk-hotspot   6995882bb329        2 weeks ago         420MB
openjdk                     jre                     6b23d41384f9        13 months ago       479MB
openjdk                     8                       6cedfea72886        2 weeks ago         510MB
openjdk                     11.0.7                  f5de33dc9079        2 weeks ago         627MB

```

The `Docker Plugin` provide an option to override the base image.

Add this line in your `build.sbt` 
```
dockerBaseImage := "adoptopenjdk:11.0.7_10-jre-hotspot"
```
and run again
```shell
sbt docker:publishLocal
```
Verify that the base image has changed into Dockerfile 
```shell
$ more target/docker/stage/Dockerfile | grep FROM
FROM adoptopenjdk:11.0.7_10-jre-hotspot as stage0
FROM adoptopenjdk:11.0.7_10-jre-hotspot as mainstage
```
The new generated docker image is 54% smaller
```shell
$ docker image ls 
REPOSITORY                  TAG                     IMAGE ID            CREATED             SIZE
hello-world                 1.0                     7f8b21413d44        10 seconds ago      241MB
<none>                      <none>                  e2585c330c0c        52 minutes ago      525MB
```
> run `docker image prune -f` to remove all dangling images.

Check that application still working
```shell
$ docker run --rm -ti hello-world:1.0
Hello, World!
```

By default, sbt Native Packager will create a daemon user named demiourgos728.
To change name of the user, add this line in your `build.sbt` 
```
daemonUser in Docker    := "daemon"
```
## Source code

[https://github.com/mohamedelhabib/hello-world-scala-docker](https://github.com/mohamedelhabib/hello-world-scala-docker)

## References

See more options into :
- [Docker Plugin Documentation](https://sbt-native-packager.readthedocs.io/en/stable/formats/docker.html)
- [Java Application Archetype](https://sbt-native-packager.readthedocs.io/en/stable/archetypes/java_app/index.html#java-app-plugin)

