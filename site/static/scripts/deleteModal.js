document.querySelectorAll('.delete-btn').forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    var id = this.getAttribute('data-id');
    var path = window.location.pathname.includes('family') ? '/family/delete/' : '/chores/delete/';
    document.getElementById('confirmDelete').href = path + id;
    var deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    deleteModal.show();
  });
});