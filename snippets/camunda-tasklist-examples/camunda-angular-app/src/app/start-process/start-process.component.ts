import { Component, OnInit, ViewChild,
  ViewContainerRef, ComponentFactoryResolver  } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { CamundaRestService } from '../camunda-rest.service';
import { GenericForm } from '../generic-form.component';

@Component({
  selector: 'app-start-process',
  templateUrl: './start-process.component.html',
  styleUrls: ['./start-process.component.css']
})
export class StartProcessComponent implements OnInit {
  private processDefinitionKey: String = null;
  private formKey: String = null;
  private rootViewContainer = null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private camundaRestService: CamundaRestService
              ) { }

  ngOnInit() {
    if (this.route.paramMap && this.route.paramMap.source) {
      this.processDefinitionKey = this.route.paramMap.source.value.processdefinitionkey;
      this.loadTaskKey();
    }
  }

  loadTaskKey(): void {
    this.camundaRestService.getProcessDefinitionTaskKey(this.processDefinitionKey)
      .subscribe(formKey => {
        this.formKey = formKey.key
      });
  }
}
