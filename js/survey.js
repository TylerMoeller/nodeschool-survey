$('form').submit(e => {
  e.preventDefault();

  let bestDays = [],
    venueRating = [],
    volunteerChoices = [],
    langs = [];

  // multi-choice answers go to an array
  const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  weekdays.forEach(day => {
    bestDays.push($('input[name=' + day + ']:checked').val());
  });
  $('input[id^=venue]:checked').filter(() => {
    venueRating.push($(this).val());
  });
  $('input[id^=volunteer]:checked').filter(() => {
    volunteerChoices.push($(this).val());
  });
  $('input[id^=langs]:checked').filter(() => {
    langs.push($(this).val());
  });

  // push a JSON object with the answers to the survey-maker backend
  let results = {
    Survey: 'NodeSchool',
    LastEventEnjoyed: $('input[name=enjoy-last-event]:checked').val(),
    LastEventFound: $('input[id=find-last-event]').val(),
    LastEventVenue: venueRating,
    LastEventFeedback: $('input[id=venuefeedback]').val(),
    MakeNextEventBetter: $('input[id=make-event-better]').val(),
    UpcomingEventInterest: $('input[name=enjoy-next-event]:checked').val(),
    BestDayAndTimes: bestDays,
    FutureTopicSuggestions: $('input[id=future-topics]').val(),
    PositiveChange: $('input[name=positive-change]:checked').val(),
    ShareYourProjects: $('input[name=personal-project-share]:checked').val(),
    ContributeToProjects: $('input[name=project-contribute]:checked').val(),
    Volunteer: volunteerChoices,
    ServerSideDev: $('input[name=server-side-dev]:checked').val(),
    YearsDeveloping: $('input[name=dev-years]:checked').val(),
    CodeLanguages: langs,
    AdditionalLangs: $('#otherlangs').val(),
    ContactInfo: $('#contact').val()
  };

  $.ajax({
    // TODO: https://github.com/nodeschool/bainbridge/issues/11
    url: '',
    type: 'POST',
    crossDomain: true,
    data: JSON.stringify(results),
    dataType: 'json'
  }).done(response => {
    // Set a cookie so we can hide the survey button on the main web page if completed
    if (localStorage) {
      localStorage.setItem('survey', 'completed');
    } else {
      $.cookie('survey', 'completed');
    }

    window.history.back().reload();
  }).fail((xhr, status) => {
    $('#error-modal').openModal();
  });
});
