// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item affix "><li class="spacer"></li><li class="chapter-item affix "><li class="spacer"></li><li class="chapter-item "><a href="Introduction/Introduction.html"><strong aria-hidden="true">1.</strong> Introduction</a></li><li class="chapter-item affix "><li class="spacer"></li><li class="chapter-item affix "><li class="spacer"></li><li class="chapter-item "><a href="Integrity/Integrity.html"><strong aria-hidden="true">2.</strong> WK 1 Integrity</a></li><li class="chapter-item "><a href="CIA_Multiple_Choice/CIA_Multiple_Choice.html"><strong aria-hidden="true">3.</strong> WK 2 CIA Quiz</a></li><li class="chapter-item "><a href="Cryptography/Cryptography.html"><strong aria-hidden="true">4.</strong> WK 3 Cryptography</a></li><li class="chapter-item "><a href="RiskAssessment/RiskAssessment.html"><strong aria-hidden="true">5.</strong> WK 4 Risk Assessment</a></li><li class="chapter-item "><a href="SystemHardening/SystemHardening.html"><strong aria-hidden="true">6.</strong> WK 5 Threats and Threat Actors | System Hardening</a></li><li class="chapter-item "><div><strong aria-hidden="true">7.</strong> WK 6</div></li><li class="chapter-item "><a href="IntroToWireshark/Intro/ToWireshark.html"><strong aria-hidden="true">8.</strong> WK 7 Intro to Wireshark</a></li><li class="chapter-item "><div><strong aria-hidden="true">9.</strong> WK 8</div></li><li class="chapter-item "><a href="WebSecurity/WebSecurity.html"><strong aria-hidden="true">10.</strong> WK 9 Web Security</a></li><li class="chapter-item "><div><strong aria-hidden="true">11.</strong> WK 10</div></li><li class="chapter-item "><div><strong aria-hidden="true">12.</strong> WK 11</div></li><li class="chapter-item "><div><strong aria-hidden="true">13.</strong> WK 12</div></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
