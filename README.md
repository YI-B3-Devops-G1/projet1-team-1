# B3 Devops - Projet 1

## Info

Team 1

---
**mail**: antinea.gontard@ynov.com

**github_username**: Maengast

---
**mail**: louise.baulan@ynov.com

**github_username**: Fayaah

---

## DockerHub

[Link to DockerHub's repository](https://hub.docker.com/repository/docker/dockeranti/projet1-team-1)

--- 

## Project 

#### Circleci configuration

Different jobs : 

- **install**    
install npm packages 

- **test**     
contains all the tests that we want to try and do an export to `circleci artifacts` and `discord` 

- **publish-image-dev**     
publish image on **DockerHub** with build number as _tag_

- **publish-image-prod**      
publish released image on **DockerHub** with version as _tag_ (vXXX.YYY.ZZZ)
