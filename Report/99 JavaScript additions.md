<!-- Do not remove this section -->

<script>
function toggleHelpers() {
  // Get all elements with the 'helper' class
  const helpers = document.querySelectorAll('.helper');
  
  // Loop through each helper and toggle its display style
  helpers.forEach(function(helper) {
    if (helper.style.display === "none") {
      helper.style.display = "block"; // Show the helper
    } else {
      helper.style.display = "none"; // Hide the helper
    }
  });

  // Change link text to reflect the current state
  const link = document.querySelector("a");
  if (link.innerHTML === "Show Help Text") {
    link.innerHTML = "Hide Help Text";
  } else {
    link.innerHTML = "Show Help Text";
  }
}
</script>

<script>
  window.addEventListener('DOMContentLoaded', function() {
    // Find the placeholder <div id="toc-placeholder">
    const tocPlaceholder = document.getElementById('toc-placeholder');
    const tocElement = document.getElementById('TOC');

    if (tocPlaceholder && tocElement) {
      // Move the TOC element after the placeholder
      tocPlaceholder.insertAdjacentElement('afterend', tocElement);
    }
  });
</script>



