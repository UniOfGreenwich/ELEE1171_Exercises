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
        this.innerHTML = '<ol class="chapter"><li class="chapter-item affix "><li class="spacer"></li><li class="chapter-item affix "><li class="spacer"></li><li class="chapter-item "><a href="Introduction/Introduction.html"><strong aria-hidden="true">1.</strong> Introduction</a></li><li class="chapter-item affix "><li class="spacer"></li><li class="chapter-item affix "><li class="spacer"></li><li class="chapter-item "><a href="Integrity/Integrity.html"><strong aria-hidden="true">2.</strong> Integrity</a></li><li class="chapter-item "><a href="CIA_Multiple_Choice/CIA_Multiple_Choice.html"><strong aria-hidden="true">3.</strong> CIA Quiz</a></li><li class="chapter-item "><a href="Cryptography/Cryptography.html"><strong aria-hidden="true">4.</strong> Cryptography</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="Steganography/Steganography.html"><strong aria-hidden="true">4.1.</strong> Steganography</a></li></ol></li><li class="chapter-item "><a href="CVE/CVE.html"><strong aria-hidden="true">5.</strong> CVE</a></li><li class="chapter-item "><a href="Security_Risks/Security_Risks.html"><strong aria-hidden="true">6.</strong> Security Risks</a></li><li class="chapter-item "><a href="Threats_and_Actors/Threats_and_Actors.html"><strong aria-hidden="true">7.</strong> Threats and Threat Actors</a></li><li class="chapter-item "><a href="IntroToWireshark/Intro/ToWireshark.html"><strong aria-hidden="true">8.</strong> Intro to Wireshark</a></li><li class="chapter-item "><a href="Law/Law.html"><strong aria-hidden="true">9.</strong> Law and Cybersecurity</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="Law/CMA_Reference.html"><strong aria-hidden="true">9.1.</strong> CMA Reference</a></li></ol></li><li class="chapter-item "><a href="IH_DFS/IH_DFS.html"><strong aria-hidden="true">10.</strong> Incident Handling &amp; DFS </a></li><li class="chapter-item "><a href="Revision/Revision.html"><strong aria-hidden="true">11.</strong> Revision</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
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
