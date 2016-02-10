var ngpo = require('ngpo'); 

// note knn-edit-task-modal as parentPo and '.taskModel'
//   on module.exports because all els are in taskModal
//   So specs don't need to always call 'taskPo.taskModal...'

var els = {
  taskModal: {
    locator: by.id('knn-edit-task-modal'),
    getPo: poShared.makeParentPo,
    els: {
      importantButton: {
        locator: by.id('important-task-button'),
        getPo: poShared.makeToggleButtonPo},
      assigned: {
        locator: by.id('assigned'),
        getPo: poShared.makeUiSelectMultiPo},
      clients: {
        locator: by.id('clients'),
        getPo: poShared.makeUiSelectMultiPo},
      task: {
        locator: by.model('vm.task.task'),
        getPo: poShared.makeInputPo},
      detail: {
        locator: by.model('vm.task.detail'),
        getPo: poShared.makeInputPo},
      dueDate: {
        locator: by.model('vm.task.dueDate'),
        getPo: poShared.makeDateInputPo},
      dateComplete: {
        locator: by.model('vm.task.dateComplete'),
        getPo: poShared.makeDateInputPo},
      createdBy: {
        locator: by.binding('vm.task.createdUID'),
        getPo: poShared.makeTextPo},
      cancelTaskButton: {
        locator: by.id('cancel-task-button'),
        getPo: poShared.makeButtonWithPausePo
      },
      completeTaskButton: {
        locator: by.id('complete-task-button'),
        getPo: poShared.makeButtonWithPausePo
      },
      saveButton: {
        locator: by.id('save-button'),
        getPo: poShared.makeButtonWithPausePo
      },
      cancelButton: {
        locator: by.id('cancel-button'),
        getPo: poShared.makeButtonWithPausePo
      },
    }
  },
}; 


module.exports = poShared.getPos(els).taskModal; 

