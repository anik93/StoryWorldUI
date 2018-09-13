import {Component, OnInit} from '@angular/core';

import {Story} from '../../classes/story/story.class';

import {Sorts} from '../../classes/sorts.class';
import {Filter} from '../../classes/common/filter.class';

import {StoryService} from '../../services/story/story.service';
import {UserDataProvider} from '../../services/userDataProvider.service';

import {ProxyResponse} from '../../classes/response.class';
import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from 'angular-2-dropdown-multiselect';


@Component({
  selector: 'storyList',
  templateUrl: './storyList.component.html',
  styleUrls: ['../../styles/styles.scss']
})
export class StoryListComponent implements OnInit {

  private sorts: Sorts = new Sorts();
  private stories: Array<Story> = new Array<Story>();
  private size: number;
  private text: string = null;
  private filters: boolean;
  private sizes: Array<Number> = new Array<Number>();
  private page: number = 1;
  private numberOfItems: number;
  private elementOfPages: Array<String> = new Array<String>();
  private optionsModel: number[];
  private optionsModelSort: number[];
  private myOptions: IMultiSelectOption[];
  private myOptionsSort: IMultiSelectOption[];
  private mySettings: IMultiSelectSettings = {
    enableSearch: true,
    dynamicTitleMaxItems: 0,
    displayAllSelectedText: true,
    pullRight: true
  };

  private mySettingsSort: IMultiSelectSettings = {
    enableSearch: true,
    pullRight: true
  };

  private myTexts: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    checked: 'item selected',
    checkedPlural: 'items selected',
    searchPlaceholder: 'Search',
    defaultTitle: 'Select',
    allSelected: 'All selected',
    searchEmptyResult: 'Nothing found...',
    searchNoRenderText: 'Type in search box to see results...'
  };

  constructor(private userDataProvider: UserDataProvider, private storyService: StoryService) {
    this.size = 10;
    this.filters = false;
    this.storyService.getStories(this.page, this.size, null, null).then(res => this.handleGetStories(res));
  }

  ngOnInit() {
    this.myOptions = [
      {id: 1, name: 'ADVENTURE'},
      {id: 2, name: 'COMEDY'},
      {id: 3, name: 'CRIME'},
      {id: 4, name: 'FANTASY'},
      {id: 5, name: 'HORROR'},
      {id: 6, name: 'ROMANCE'},
      {id: 7, name: 'SCIFI'}
    ];
    this.myOptionsSort = [
      {id: 8, name: 'Name ASC'},
      {id: 9, name: 'Name DESC'},
      {id: 10, name: 'Rate ASC'},
      {id: 11, name: 'Rate DESC'}
    ];
    this.sizes.push(10);
    this.sizes.push(30);
    this.sizes.push(50);
  }

  pageChanged(event: String) {
    this.storyService.getStories(this.page, this.size, this.text, null).then(res => this.handleGetStories(res));
  }

  onChangeSort() {
    if (this.optionsModelSort.length === 1 && this.optionsModelSort.some(x => x === 8)) {
      this.myOptionsSort = [
        {id: 8, name: 'Name ASC'},
        {id: 10, name: 'Rate ASC'},
        {id: 11, name: 'Rate DESC'}
      ];
      this.sorts.key = 'ASC';
      this.sorts.value = new Array<String>("name", "rate");
      //this.storyService.getStories();
    } else if (this.optionsModelSort.length === 1 && this.optionsModelSort.some(x => x === 9)) {
      this.myOptionsSort = [
        {id: 9, name: 'Name DESC'},
        {id: 10, name: 'Rate ASC'},
        {id: 11, name: 'Rate DESC'}
      ];
    } else if (this.optionsModelSort.length === 1 && this.optionsModelSort.some(x => x === 10)) {
      this.myOptionsSort = [
        {id: 8, name: 'Name ASC'},
        {id: 9, name: 'Name DESC'},
        {id: 10, name: 'Rate ASC'}
      ];
    } else if (this.optionsModelSort.length === 1 && this.optionsModelSort.some(x => x === 11)) {
      this.myOptionsSort = [
        {id: 8, name: 'Name ASC'},
        {id: 9, name: 'Name DESC'},
        {id: 11, name: 'Rate DESC'}
      ];
    } else if (this.optionsModelSort.length === 2 && this.optionsModelSort.some(x => x === 8)
      && this.optionsModelSort.some(x => x === 10)) {
      this.myOptionsSort = [
        {id: 8, name: 'Name ASC'},
        {id: 10, name: 'Rate ASC'}
      ];
    } else if (this.optionsModelSort.length === 2 && this.optionsModelSort.some(x => x === 8)
      && this.optionsModelSort.some(x => x === 11)) {
      this.myOptionsSort = [
        {id: 8, name: 'Name ASC'},
        {id: 11, name: 'Rate DESC'}
      ];
    } else if (this.optionsModelSort.length === 2 && this.optionsModelSort.some(x => x === 9)
      && this.optionsModelSort.some(x => x === 10)) {
      this.myOptionsSort = [
        {id: 9, name: 'Name DESC'},
        {id: 10, name: 'Rate ASC'}
      ];
    } else if (this.optionsModelSort.length === 2 && this.optionsModelSort.some(x => x === 9)
      && this.optionsModelSort.some(x => x === 11)) {
      this.myOptionsSort = [
        {id: 9, name: 'Name DESC'},
        {id: 11, name: 'Rate DESC'}
      ];
    } else if (this.optionsModelSort.length === 0) {
      this.myOptionsSort = [
        {id: 8, name: 'Name ASC'},
        {id: 9, name: 'Name DESC'},
        {id: 10, name: 'Rate ASC'},
        {id: 11, name: 'Rate DESC'}
      ];
    }
  }

  private changePageSize(size: Number) {
    this.size = + size;
    this.page = 1;
    this.storyService.getStories(this.page, this.size, this.text, null).then(res => this.handleGetStories(res));
  }

  private handleGetStories(res: ProxyResponse<Story>) {
    if (res) {
      this.stories = res.getList();
      this.elementOfPages = [];
      this.numberOfItems = res.getCounter();
    }
  }

  public search() {
    this.page = 1;
    this.storyService.getStories(this.page, this.size, this.text, null).then(res => this.handleGetStories(res));
  }

  public reset() {
    this.text = null;
    this.page = 1;
    this.storyService.getStories(this.page, this.size, this.text, null).then(res => this.handleGetStories(res));
  }

  public showFilters() {
    this.filters = !this.filters;
  }

  remove(story: Story) {
    console.log(story);
  }

}
