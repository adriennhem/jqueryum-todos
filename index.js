$(window).ready(function() {
    var userID = 206;

    // 1. get all the tasks
    $.ajax({
        type: 'GET',
        url: `https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=1`,
        dataType: 'json',
        success: function (response, textStatus) {
          $.each(response.tasks, function(index, value) {
              console.log(value);
              var todo = $(`<div data-item="${value.id}" class="todo ${value.completed} pt-4 pb-4">
                             <p class="todo-content">${value.content}</p>
                             <button class="remove-button btn btn-secondary float-right">Delete</button>
                             <button class="mark-complete-button btn btn-primary float-right mr-2">Complete</button>
                            </div>`);
             todo.appendTo('.todolist');
          })
        },
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
      });



// https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=206

});