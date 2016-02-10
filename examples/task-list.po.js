var ngpo = require('ngpo'); 

var els = {

  taskList: {
    locator: by.repeater('task in vm.taskList'),
    getPo: poShared.makeListPo,
    els: {
      importantButton: {
        locator: by.id('important-task-button'),
        getPo: poShared.makeToggleButtonPo
      },
      task: {
        locator: by.binding("task.task"),
        getPo: poShared.makeTextPo},
      dueDate: {
        locator: by.binding("task.dueDate"),
        getPo: poShared.makeTextPo,
      },
      dateComplete: {
        locator: by.binding("task.dateComplete"),
        getPo: poShared.makeTextPo
      },
      clientList: {
        locator: by.binding('client.name.display'),
        getPo: poShared.makeListPo, 
      }, 
      assignedList: {
        locator: by.binding('assigned'),
        getPo: poShared.makeListPo,
      },
      unreadButton: {
        locator: by.id('unread-button'),
        getPo: poShared.makeDefaultPo
      },
      completeButton: {
        locator: by.id('complete-task-button'),
        getPo: poShared.makeDefaultPo
      }
    },
  },
  taskFilter: {
    locator: by.id("taskFilter.task"),
    getPo: poShared.makeInputPo},
  assignedFilter: {
    // locator: by.model('vm.state.filterObj.assigned'),
    locator: by.id('assigned'),
    getPo: poShared.makeUiSelectPo},
  statusFilter: {
    locator: by.model('vm.state.filterObj.status'),
    getPo: poShared.makeUiSelectPo},
  clientFilter: {
    locator: by.model('vm.state.filterObj.client'),
    getPo: poShared.makeInputPo},
  dueDateFilter: {
    locator: by.model('vm.state.filterObj.dueDate'),
    getPo: poShared.makeInputPo},
  resetButton: {
    locator: by.id('reset-button'),
    getPo: poShared.makeDefaultPo
  }    
};

module.exports = ngpo.getPos(els); 
