export default async function decorate(block) {
  // Create a wrapper div for the video
  const wrapper = document.createElement('div');
  wrapper.className = 'hero-video-wrapper';

  // Create the <video> element
  const video = document.createElement('video');
  video.src = 'assets/vid.mov'; // Replace with your actual video path
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

  // Move all children except the video wrapper into the overlay
  // (skip the first child, which is the video wrapper)
  while (block.children.length > 1) {
    overlay.appendChild(block.children[1]);
  }
  block.appendChild(overlay);
}
