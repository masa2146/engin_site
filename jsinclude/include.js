/*-----------------------
/shop/layout/jsinclude/__health_qvideowrapper
-----------------------*/

(function() {
  const services = [
    { id: "youtube",    name: "YouTube",     url: "youtube" },
    { id: "vimeo",      name: "Vimeo",       url: "vimeo.com" },
    { id: "googlemaps", name: "Google Maps", url: "google.com/maps" },
    { id: "jameda",     name: "Jameda",      url: "jameda.de" },
    { id: "instagram",  name: "Instagram",   url: "instagram.com" }
  ];

  function wrapVideo(iframe, service) {
    // create wrapper element
    let wrapper = document.createElement("div");
    // wrapper.classList.add("qVideoWrapper", "qVideoWrapper--" + service.id, "qVideoWrapper--hidden");
    iframe.parentNode.insertBefore(wrapper, iframe);

    // remove the iframe
    // iframe.parentNode.removeChild(iframe);

    // create placeholder content
    // let disableText = document.createElement("div");
    // disableText.classList.add("qVideoWrapper__textContent");
    // disableText.innerHTML =
    //   "<p>Aktivieren Sie den " +
    //   service.name +
    //   " Cookie, um diesen Inhalt anzuzeigen.</p><p>Klicken Sie hier, um die Cookieeinstellungen aufzurufen.</p>";
    // wrapper.appendChild(disableText);

    // // open CCM on click
    // wrapper.addEventListener("click", function() {
    //   ieQ.cookie.showManager("md");
    // });

    return wrapper;
  }

  function checkHasCookie(service) {
    return (
      document.cookie.replace(/(?:(?:^|.*;\s*)cookie_optin_q\s*\=\s*([^;]*).*$)|^.*$/, "$1").indexOf(service) >= 0 ||
      document.cookie.replace(/(?:(?:^|.*;\s*)cookie_optin_q\s*\=\s*([^;]*).*$)|^.*$/, "$1").indexOf("alle") >= 0
    );
  }

  function getService(src) {
    for (let i = 0; i < services.length; i++) if (src.indexOf(services[i].url) >= 0) return services[i];
    return false;
  }

  function hideIframe(iframe) {
    const src = iframe.src;
    const service = getService(src);

    if (!service) return;

    const wrapper = wrapVideo(iframe, service);

    if (checkHasCookie(service.id)) {
      wrapper.innerHTML = "";
      wrapper.classList.remove("qVideoWrapper--hidden");
      wrapper.appendChild(iframe);
    }
  }

  document.addEventListener("DOMContentLoaded", function() {
    const iframes = document.querySelectorAll("iframe");

    for (let i = 0; i < iframes.length; i++) {
      hideIframe(iframes[i]);
    }
  }, false);

  // Detect jameda iframe

  const mutationObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.target.nodeName === "IFRAME") {
        const iframe = mutation.target;
        hideIframe(mutation.target);
        console.log(mutation);
      }
    });
  });

  mutationObserver.observe(document.documentElement, {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: false,
    attributeOldValue: true,
    characterDataOldValue: true,
  });
})();

/*-----------------------
/shop/layout/jsinclude/lp_js
-----------------------*/

//Leer

