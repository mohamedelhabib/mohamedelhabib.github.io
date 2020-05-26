---
type: post
title:  "Insall Strimzi kafka operator into k3d"
date:   2020-05-18
tags: [Strimzi, kafka operator, kafka, k3d, k3s, kubernetes, k8s] 
menu: true
toc: true
---

## What is Strimzi?
### Operator pattern in Kubernetes

> Extract from https://kubernetes.io/docs/concepts/extend-kubernetes/operator/

Kubernetes is designed for automation. Out of the box, you get lots of built-in automation from the core of Kubernetes. You can use Kubernetes to automate deploying and running workloads, and you can automate how Kubernetes does that `using Operators`.

Kubernetes controllers concept lets you extend the cluster’s behaviour without modifying the code of Kubernetes itself. Operators are clients of the Kubernetes API that act as controllers for a Custom Resource.

### Strimzi Kafka Operator

> Extract from https://strimzi.io/docs/operators/master/overview.html

Strimzi provides container images and Operators for running Kafka on Kubernetes.  
Operators simplify the process of:

- Deploying and running Kafka clusters
- Deploying and running Kafka components
- Configuring access to Kafka
- Securing access to Kafka
- Upgrading Kafka
- Managing brokers
- Creating and managing topics
- Creating and managing users

## What is k3s (the official definition)
`k3s` is a fully compliant Kubernetes distribution with the following changes:
1. Packaged as a single binary.
1. Lightweight storage backend based on sqlite3 as the default storage mechanism. etcd3, MySQL, Postgres also still available.
1. Wrapped in simple launcher that handles a lot of the complexity of TLS and options.
1. Secure by default with reasonable defaults for lightweight environments.
1. Minimal to no OS dependencies (just a sane kernel and cgroup mounts needed). k3s packages required
   dependencies
    * containerd
    * Flannel
    * CoreDNS
    * CNI
    * Host utilities (iptables, socat, etc)
    * Ingress controller (traefik)
    * Embedded service loadbalancer
    * Embedded network policy controller

### What is k3d?
`k3d` is a `Go` binary file that run `k3s` in docker. A very simple installation way and no modification in your system just one docker container that contain the Kubernetes cluster.

## Requirements
- docker
- kubectl
 
## Deploy Kafka into k3d

### Install k3d

The installation script `install.sh` will run the following steps
```bash
initArch # discovers the architecture for this system
initOS # discovers the operating system for this system
verifySupported # checks that the os/arch combination is supported for binary builds
checkTagProvided || checkLatestVersion
if ! checkK3dInstalledVersion; then
  downloadFile # downloads the latest binary package and also the checksum
  installFile # make the Go binary file executable and mv it to /usr/local/bin/.
fi
```
```bash
:${K3D_INSTALL_DIR:="/usr/local/bin"}
...
installFile() {
  echo "Preparing to install $APP_NAME into ${K3D_INSTALL_DIR}"
  runAsRoot chmod +x "$K3D_TMP_FILE"
  runAsRoot cp "$K3D_TMP_FILE" "$K3D_INSTALL_DIR/$APP_NAME"
  echo "$APP_NAME installed into $K3D_INSTALL_DIR/$APP_NAME"
}
```
To install `k3d` run the following command
```shell
$ curl -s https://raw.githubusercontent.com/rancher/k3d/v1.7.0/install.sh | bash
```

## Create a Kubernetes cluster

Run this command to create the Kubernetes cluster 
```shell
$ k3d create --name mykube
INFO[0000] Created cluster network with ID ca3f27c73582ea01d220103908d5a316bbb2dfdfa53bf6c16821d30a0877e1c4 
INFO[0000] Created docker volume  k3d-mykube-images        
INFO[0000] Creating cluster [mykube]                       
INFO[0000] Creating server using docker.io/rancher/k3s:v1.17.3-k3s1... 
INFO[0001] SUCCESS: created cluster [mykube]               
INFO[0001] You can now use the cluster with:
export KUBECONFIG="$(k3d get-kubeconfig --name='mykube')"
kubectl cluster-info
```
As requested above run this command to configure kubectl to be able to access to the Kubernetes cluster and run `kubectl cluster-info` to test.
```shell
$ export KUBECONFIG="$(k3d get-kubeconfig --name='mykube')"
$ kubectl cluster-info
Kubernetes master is running at https://localhost:6443
CoreDNS is running at https://localhost:6443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
Metrics-server is running at https://localhost:6443/api/v1/namespaces/kube-system/services/https:metrics-server:/proxy
```
You should have a docker new running container containing the `k3s` cluster
```shell
$ docker ps
CONTAINER ID        IMAGE                      COMMAND                  CREATED             STATUS              PORTS                    NAMES
4a672054b66c        rancher/k3s:v1.17.3-k3s1   "/bin/k3s server --h…"   About an hour ago   Up About an hour    0.0.0.0:6443->6443/tcp   k3d-mykube-server
```
## Deploy Strimzi Kafka operator
```shell
$ mkdir k8s
```
### Create the kafka namespace manifest

```shell
$ touch k8s/01_namespace.yml 
```
Edit the `k8s/01_namespace.yml` file and paste the following content
```yaml
---
apiVersion: v1
kind: Namespace
metadata:
  name: kafka
```
### Create the strimzi kafka operator namespace manifest

```shell
$ curl https://strimzi.io/install/latest?namespace=kafka -o k8s/02_strimzi_kafka_operator.yml
```
### Create the kafka namespace manifest

```shell
$ curl https://strimzi.io/examples/latest/kafka/kafka-persistent-single.yaml -o 03_kafka-persistent-single.yml
```

### Deploy into Kubernetes

Run the following command to deploy created manifests.
```shell
$ kubectl apply --namespace=kafka -R -f k8s
namespace/kafka created
customresourcedefinition.apiextensions.k8s.io/kafkas.kafka.strimzi.io created
rolebinding.rbac.authorization.k8s.io/strimzi-cluster-operator-entity-operator-delegation created
clusterrolebinding.rbac.authorization.k8s.io/strimzi-cluster-operator created
rolebinding.rbac.authorization.k8s.io/strimzi-cluster-operator-topic-operator-delegation created
customresourcedefinition.apiextensions.k8s.io/kafkausers.kafka.strimzi.io created
customresourcedefinition.apiextensions.k8s.io/kafkamirrormaker2s.kafka.strimzi.io created
clusterrole.rbac.authorization.k8s.io/strimzi-entity-operator created
clusterrole.rbac.authorization.k8s.io/strimzi-cluster-operator-global created
clusterrolebinding.rbac.authorization.k8s.io/strimzi-cluster-operator-kafka-broker-delegation created
rolebinding.rbac.authorization.k8s.io/strimzi-cluster-operator created
clusterrole.rbac.authorization.k8s.io/strimzi-cluster-operator-namespaced created
clusterrole.rbac.authorization.k8s.io/strimzi-topic-operator created
serviceaccount/strimzi-cluster-operator created
clusterrole.rbac.authorization.k8s.io/strimzi-kafka-broker created
customresourcedefinition.apiextensions.k8s.io/kafkatopics.kafka.strimzi.io created
customresourcedefinition.apiextensions.k8s.io/kafkabridges.kafka.strimzi.io created
deployment.apps/strimzi-cluster-operator created
customresourcedefinition.apiextensions.k8s.io/kafkaconnectors.kafka.strimzi.io created
customresourcedefinition.apiextensions.k8s.io/kafkaconnects2is.kafka.strimzi.io created
customresourcedefinition.apiextensions.k8s.io/kafkaconnects.kafka.strimzi.io created
customresourcedefinition.apiextensions.k8s.io/kafkamirrormakers.kafka.strimzi.io created
kafka.kafka.strimzi.io/my-cluster created
```
Run the following command to wait until kafka is ready, in may take few minutes (2 minutes on my laptop)
```shell
$ kubectl wait kafka/my-cluster --for=condition=Ready --timeout=300s -n kafka
kafka.kafka.strimzi.io/my-cluster condition met
```
### Test using kafka-console-producer and kafka-console-consumer

Run this command to deploy a console producer, enter some texte and tape enter for each message, (Ctrl+C) to exit. 
```shell
$ kubectl -n kafka run kafka-producer -ti --image=strimzi/kafka:0.17.0-kafka-2.4.0 --rm=true --restart=Never -- bin/kafka-console-producer.sh --broker-list my-cluster-kafka-bootstrap:9092 --topic my-topic
```
Run this command to deploy a console consumer, you should see messages sent using producer into previous step. 
```shell
$ kubectl -n kafka run kafka-consumer -ti --image=strimzi/kafka:0.17.0-kafka-2.4.0 --rm=true --restart=Never -- bin/kafka-console-consumer.sh --bootstrap-server my-cluster-kafka-bootstrap:9092 --topic my-topic --from-beginning
```