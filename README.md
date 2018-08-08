### install

First step:
```sh
$ docker build -t rolique/video2gif .
```

Second step:
```sh
$ docker run -p 8080:8000 -d rolique/video2gif
```

#### usege
For production release:
```sh
$ http://localhost:8080/?url=<YoutubeVideoUrl>
```
for example 
```sh
$ wget -O output.gif http://localhost:8080/gif?url=https://www.youtube.com/watch?v=l38ysTGM3Ow
```