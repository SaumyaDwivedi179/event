// import {vid} from '../assets/vid.mov';

export default async function decorate(block) {
  // Create a wrapper div for the video
  const wrapper = document.createElement('div');
  wrapper.className = 'hero-video-wrapper';

  // Create the <video> element
  const video = document.createElement('video');

  video.src = 'blocks/vidhero/vid.mp4';
  video.autoplay = true;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.setAttribute('style', 'width: 100%; max-height: 480px; object-fit: cover;');

  wrapper.appendChild(video);

  // Insert the video wrapper at the top of the block, before existing content
  block.insertBefore(wrapper, block.firstChild);

  const overlay = document.createElement('div');
  overlay.className = 'hero-overlay-content';

  while (block.children.length > 1) {
    overlay.appendChild(block.children[1]);
  }
  block.appendChild(overlay);
}
