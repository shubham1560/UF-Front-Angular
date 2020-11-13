import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-community-landing',
  templateUrl: './community-landing.component.html',
  styleUrls: ['./community-landing.component.scss']
})
export class CommunityLandingComponent implements OnInit {

  constructor(
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle("Community - SortedTree");
  }

}
