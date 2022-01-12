import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { OkrTopicDraft } from '../../shared/model/ui/OrganizationalUnit/okr-topic-draft/okr-topic-draft';
import { TopicDraftMapper } from '../../shared/services/mapper/topic-draft-mapper';
import { SubmittedTopicDraftDetailsFormData } from '../submitted-topic-draft-details/submitted-topic-draft-details.component';

@Component({
  selector: 'app-submitted-topic-draft-edit',
  templateUrl: './submitted-topic-draft-edit.component.html',
  styleUrls: ['./submitted-topic-draft-edit.component.css'],
})
export class SubmittedTopicDraftEditComponent implements OnInit {

  topicDraft: OkrTopicDraft;
  topicDraftForm: FormGroup;
  title: string;
  minBegin: Date;
  editedTopicDraftEvent: EventEmitter<OkrTopicDraft>;

  constructor(
    private dialogRef: MatDialogRef<SubmittedTopicDraftEditComponent>,
    private topicDraftMapper: TopicDraftMapper,
    @Inject(MAT_DIALOG_DATA) private formData: (SubmittedTopicDraftDetailsFormData | any),
  ) {
  }

  ngOnInit(): void {
    this.topicDraft = this.formData.topicDraft;
    this.editedTopicDraftEvent = this.formData.editedTopicDraftEvent;
    this.minBegin = this.topicDraft.beginning;
    this.topicDraftForm = new FormGroup({
      name: new FormControl(this.topicDraft.name, [Validators.maxLength(255), Validators.required]),
      description: new FormControl(this.topicDraft.description, Validators.maxLength(1024)),
      contributesTo: new FormControl(this.topicDraft.contributesTo, Validators.maxLength(1024)),
      delimitation: new FormControl(this.topicDraft.delimitation, Validators.maxLength(1024)),
      beginning: new FormControl(this.topicDraft.beginning, [Validators.required]),
      dependencies: new FormControl(this.topicDraft.dependencies, Validators.maxLength(1024)),
      resources: new FormControl(this.topicDraft.resources, Validators.maxLength(1024)),
      handoverPlan: new FormControl(this.topicDraft.handoverPlan, Validators.maxLength(1024)),
      initiatorId: new FormControl(this.topicDraft.initiatorId, [Validators.required]),
      startTeam: new FormControl(this.topicDraft.startTeam),
      stakeholders: new FormControl(this.topicDraft.stakeholders),
    });

    if (this.formData.topicDraft) {
      this.topicDraftForm.patchValue(this.formData.topicDraft);
    }

    this.title = 'Themenentwurf bearbeiten';
  }

  saveTopicDraft(): void {
    const oldTopicDraft: OkrTopicDraft = this.topicDraft;
    const formTopicDraft: OkrTopicDraft = this.topicDraftForm.getRawValue();
    const updatedTopicDraft: OkrTopicDraft = { ...oldTopicDraft, ...formTopicDraft };
    this.dialogRef.close(
      this.topicDraftMapper.updateTopicDraft$(updatedTopicDraft).pipe(first())
        .subscribe(),
    );
    this.editedTopicDraftEvent.emit(updatedTopicDraft);
  }

}
