document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('.custom-search-bar');
    if (form) {
        form.addEventListener('submit', function (e) {
            var select = document.getElementById('collection-select');
            var collection = select.value;
            var q = this.querySelector('input[name="q"]').value;
            if (collection) {
                window.location.href = '/collections/' + collection + '?q=' + encodeURIComponent(q);
                e.preventDefault();
            }
        });
    }
});