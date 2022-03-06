async function downloadVideo() {
  var url = document.getElementById("url").value;
  var video_id = "";
  if (url == "") {
    alert("Video URL should not be empty");
  } else {
    if (url.includes("shorts")) {
      video_id = url.split("/")[4];
    } else {
      video_id = url.split("v=")[1].slice(0, 11);
    }
    var result = await getVideoLink(video_id);
  }
}

function getVideoLink(video_id) {
  fetch(
    "https://youtube-downloader9.p.rapidapi.com/" + video_id + "/videoandaudio",
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "youtube-downloader9.p.rapidapi.com",
        "x-rapidapi-key": "578b771870mshea19d8ae701033fp1db6d1jsnc270e20be7bf"
      }
    }
  )
    .then((response) => {
      // console.log(response);
      response.json().then((data) => {
        console.log(data);
        // return data[0]["url"];
        if (!data[0]["isLive"]) {
          window.open(data[0]["url"], "_blank");
        } else {
          alert("Live video can't be downloaded");
        }
      });
    })
    .catch((err) => {
      console.error(err);
    });
}
