import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (args.UserNameSearch) {
      value = value.filter(user => user.firstName.toLowerCase().indexOf(args.UserNameSearch.toLowerCase()) != -1 || (user.lastName.toLowerCase().indexOf(args.UserNameSearch.toLowerCase()) != -1));
    }

    if (args.ProjectSearch) {
      value = value.filter(task => task.project.toLowerCase().indexOf(args.ProjectSearch.toLowerCase()) != -1);
    }

    if (args.AllProjectSearch) {
      value = value.filter(proj => proj.project.toLowerCase().indexOf(args.AllProjectSearch.toLowerCase()) != -1);
    }

    if (args.radioProjectSearch) {
      value = value.filter(project => project.project.toLowerCase().indexOf(args.radioProjectSearch.toLowerCase()) != -1);
    }

    if (args.radioTaskProjectSearch) {
      value = value.filter(proj => proj.project.toLowerCase().indexOf(args.radioTaskProjectSearch.toLowerCase()) != -1);
    }

    if (args.radioManagerSearch) {
	  value = value.filter(manager => manager.firstName.toLowerCase().indexOf(args.radioManagerSearch.toLowerCase()) != -1 || (manager.lastName.toLowerCase().indexOf(args.radioManagerSearch.toLowerCase()) != -1));
    }

    if (args.radioParentTaskSearch) {
      value = value.filter(parent => parent.task.toLowerCase().indexOf(args.radioParentTaskSearch.toLowerCase()) != -1);
    }

    if (args.radioUserTaskSearch) {
      value = value.filter(user => user.firstName.toLowerCase().indexOf(args.radioUserTaskSearch.toLowerCase()) != -1 || (user.lastName.toLowerCase().indexOf(args.radioUserTaskSearch.toLowerCase()) != -1));
    }

    return value;

  }

}
