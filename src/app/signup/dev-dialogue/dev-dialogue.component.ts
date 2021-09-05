import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {StorageService} from '../../services/storage.service';
@Component({
  selector: 'app-dev-dialogue',
  templateUrl: './dev-dialogue.component.html',
  styleUrls: ['./dev-dialogue.component.css', '../../../assets/css/general.css']
})
export class DevDialogueComponent implements OnInit {

  constructor(private router: Router, public storageService:StorageService) { }
  technicalCheck = false;
  cofounderCheck = false;
  personCheck = false;
  public agreementForm: FormGroup;

  ngOnInit() {
    console.log(this.technicalCheck);
  }

  navigateToHome() {
    this.router.navigate(['/profiles']);
  }



}
