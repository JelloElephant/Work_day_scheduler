var options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

var currTime = new Date();

$(function () {
  $('#currentDay').text(currTime.toLocaleString(('en-US'), options));

  $('#container').html(
    [9, 10, 11, 12, 13, 14, 15, 16, 17].map((hour) => {
      var timeRef = '';

      var preVal = localStorage.getItem(`block-${hour}`) || '';

      if (currTime.getHours() === hour) {
        timeRef = 'current row time-block';
      } else if (currTime.getHours() < hour) {
        timeRef = 'future row time-block';
      } else {
        timeRef = 'past row time-block';
      }

      return `<div id='hour-${hour}' class='row ${timeRef}'>
        <div class='col-2 col-md-1 hour text-center align-items-center justify-content-center'>${hour === 12 ? 12 : hour % 12}${hour / 12 >= 1 ? 'PM' : 'AM'}</div>
        <textarea id='block-${hour}' class='col-8 col-md-10 task' rows='3'>${preVal}</textarea>
        <button id='btn-${hour}' class='btn saveBtn col-2 col-md-1' aria-label='save'>
          <i class='fas fa-save' aria-hidden='true'></i>
        </button>
      </div>`;
    }).join('')
  );

  $('.task').on('change', (text) => {
    $(document).on('click', '.saveBtn, .saveBtn i', (btn) => {
      var hourNum = btn.target.id ? btn.target.id.split('-')[1] : btn.target.parentElement.id.split('-')[1];
      var updateText = `block-${hourNum}`;
      var textUpdated = $(`#${updateText}`).val();
      localStorage.setItem(updateText, textUpdated);
    })
  });
});
