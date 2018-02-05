/* global $, mdc, storage, dialog */

if (typeof ratioslider !== 'undefined') {
  ratioslider = ratioslider.destroy()
}
var ratioslider = new mdc.slider.MDCSlider($('#ratioslider')[0])
ratioslider.value = storage.get('settings.cardratio') || 10
$('#ratioperc').text((storage.get('settings.cardratio') || 10) + '%')
$('#notratioperc').text((100 - (storage.get('settings.cardratio') || 10)) + '%')

ratioslider.listen('MDCSlider:change', _ => {
  $('#ratioperc').text(`${ratioslider.value}%`)
  $('#notratioperc').text(`${100 - ratioslider.value}%`)
  storage.set('settings.cardratio', ratioslider.value)
})

$('#subtagsGood, #subtagsNeutral, #subtagsBad').change((data) => {
  let val = $(data.target).val()
  let gnb = $(data.target).attr('id').slice(7)
  $('#subtagsExampleTag' + gnb).text(val)
  storage.set('settings.subtags.' + gnb.toLowerCase(), val)
})

if (storage.get('settings.subtags') !== undefined) {
  $('#subtagsGood').val(storage.get('settings.subtags.good') || 'good')
  $('#subtagsExampleTagGood').text(storage.get('settings.subtags.good') || 'good')
  $('#subtagsNeutral').val(storage.get('settings.subtags.neutral') || 'boring')
  $('#subtagsExampleTagNeutral').text(storage.get('settings.subtags.neutral') || 'boring')
  $('#subtagsBad').val(storage.get('settings.subtags.bad') || 'bad')
  $('#subtagsExampleTagBad').text(storage.get('settings.subtags.bad') || 'bad')
}

if (storage.get('settings.disableHardwareAcceleration') === true) {
  $('#disableHardwareAcceleration').prop('checked', true)
}

$('#disableHardwareAcceleration').on('click', _ => {
  storage.set('settings.disableHardwareAcceleration', $('#disableHardwareAcceleration').is(':checked'))
})

if (storage.get('profile.gender.nick') !== undefined) $('#subtagsExampleGenderNick').text(storage.get('profile.gender.nick'))

$('#autoReport').change(_ => {
  let check = $('#autoReport').is(':checked')
  if (check) {
    storage.set('settings.autoReport', true)
    $('#autoReportPathDiv').slideDown(200)
  } else {
    storage.set('settings.autoReport', false)
    $('#autoReportPathDiv').slideUp(200)
  }
})

if (storage.get('settings.autoReport')) $('#autoReport').trigger('click')

if (storage.get('settings.autoReportPath') !== undefined) {
  $('#autoReportPathLabel').text(storage.get('settings.autoReportPath'))
  $('#autoReportPathLabel').fadeIn(100)
}

$('#autoReportPathBtn').click(_ => {
  dialog.showOpenDialog({
    title: 'Select location to save reports',
    properties: ['openDirectory']
  }, (path) => {
    if (path !== '' && path !== undefined) {
      storage.set('settings.autoReportPath', path)
      $('#autoReportPathLabel').text(path)
      $('#autoReportPathLabel').fadeIn(200)
    } else {
      $('#autoReportPathLabel').fadeOut(200)
    }
  })
})

function resetAll () {
  storage.clear()
  document.location.href = document.location.href
}

$('#swapper').ready(_ => {
  ratioslider.layout()
  mdc.autoInit()
  if (resetAll) {}
})
