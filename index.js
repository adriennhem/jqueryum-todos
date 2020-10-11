$(window).ready(function() {
    var userID = 206;

    // 1. get all the tasks
    $.ajax({
        type: 'GET',
        url: `https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=${userID}`,
        dataType: 'json',
        success: function (response, textStatus) {
          $.each(response.tasks, function(index, value) {
              var todo = $(`<div data-item="${value.id}" class="todo ${value.completed} pt-4 pb-4">
                             <p class="todo-content">${value.content}</p>
                             <button class="remove-button btn btn-secondary float-right">Delete</button>
                             <button class="mark-complete-button btn btn-primary float-right mr-2">Complete</button>
                            </div>`);
             todo.appendTo('.todos-wrapper');
          })
        },
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
      });


      // 2. add todos
      var addTodo = function() {
        $.ajax({
            type: 'POST',
            url: `https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=${userID}`,
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
              task: {
                content: $('input').val()
              }
            }),
            success: function (response, textStatus) {
              var todo = $(`<div data-item="${response.task.id}" class="todo ${response.task.completed} pt-4 pb-4">
              <p class="todo-content">${response.task.content}</p>
              <button class="remove-button btn btn-secondary float-right">Delete</button>
              <button class="mark-complete-button btn btn-primary float-right mr-2">Complete</button>
             </div>`);
            todo.prependTo('.todos-wrapper');
            },
            error: function (request, textStatus, errorMessage) {
              console.log(errorMessage);
            }
          });
      };


      // 3. add event handler to the add button
      $('.input-wrapper button').click(function(e) {
        e.preventDefault();
        if ($('input').val() != '') {
            addTodo();
            $('input').val('');
        }
      });
});