$(window).ready(function() {
    var userID = 206;

    // 1. get all the tasks
    $.ajax({
        type: 'GET',
        url: `https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=${userID}`,
        dataType: 'json',
        success: function (response, textStatus) {
          $.each(response.tasks, function(index, value) {
              var todo = $(`<div data-item="${value.id}" class="todo ${value.completed ? 'completed' : 'false'} pt-4 pb-4">
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
              var todo = $(`<div data-item="${response.task.id}" class="todo ${response.task.completed ? 'completed' : 'false'} pt-4 pb-4">
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

      // 4. Delete todo
      var deleteTodo = function(todoID) {
        $.ajax({
            type: 'DELETE',
            url: `https://altcademy-to-do-list-api.herokuapp.com/tasks/${todoID}?api_key=${userID}`,
            success: function (response, textStatus) {
              $(`.todo[data-item=${todoID}]`).remove();
            },
            error: function (request, textStatus, errorMessage) {
              console.log(errorMessage);
            }
          });
      };

      // 5. add event handler on delete button
      $(document).on('click', '.remove-button', function() {
        var todoID = $(this).parent().attr('data-item');
        deleteTodo(todoID);
      });

      // 6. mark todo as complete
      var completeTodo = function(todoID) {
        $.ajax({
            type: 'PUT',
            url: `https://altcademy-to-do-list-api.herokuapp.com/tasks/${todoID}/mark_complete?api_key=${userID}`,
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
              task: {
                completed: true
              }
            }),
            success: function (response, textStatus) {
              $(`.todo[data-item=${todoID}]`).toggleClass('completed');
            },
            error: function (request, textStatus, errorMessage) {
              console.log(errorMessage);
            }
          });
      };


      // 7. add event handler on complete button
      $(document).on('click', '.mark-complete-button', function() {
        var todoID = $(this).parent().attr('data-item');
        completeTodo(todoID);
      });

});