// import {vid} from '../assets/vid.mov';

export default async function decorate(block) {
  // Create a wrapper div for the video
  const wrapper = document.createElement('div');
  wrapper.className = 'hero-video-wrapper';

  console.log(block);

  // Create the <video> element
  const video = document.createElement('video');
  // <iframe src="https://drive.google.com/file/d/1kDpfLFM7grVcY7nr-kIebZUs7opkzoWk/view?usp=drive_link></iframe>
  video.src = 'https://landing-page--event--saumyadwivedi179.aem.page/blocks/vidhero/vid.mov'; // Replace with your actual video path
   video.autoplay = true;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.setAttribute('style', 'width: 100%; max-height: 480px; object-fit: cover;');
  // // console.log(vid);
  // video.allow = 'autoplay'; // Allow autoplay and fullscreen
  // video.allowFullscreen = true; // Allow fullscreen mode
  //https://player.vimeo.com/video/1099948490?context=Vimeo%5CController%5CApi%5CResources%5CVideoController.&h=c9268a90c8&s=4acba3a65034e964e3135430142134e5285dbeef_1752160901" width="640" height="564" frameborder="0" allow="autoplay; fullscreen" allowfullscreen


  // old attributes


  wrapper.appendChild(video);

  // Insert the video wrapper at the top of the block, before existing content
  block.insertBefore(wrapper, block.firstChild);

  const overlay = document.createElement('div');
  overlay.className = 'hero-overlay-content';

  // Move all children except the video wrapper into the overlay
  // (skip the first child, which is the video wrapper)
  while (block.children.length > 1) {
    overlay.appendChild(block.children[1]);
  }
  block.appendChild(overlay);
}
