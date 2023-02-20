(function () {
    function pageIsActive() {
        let links = document.querySelectorAll(".default-header nav a")
        console.log(links)
        for (let i = 0; i < links.length; i++) {
            if (links[i].pathname === document.location.pathname) {
                document.getElementById(links[i].id).style.color = '#daa512';
                break
            }
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        pageIsActive();
    })
})();