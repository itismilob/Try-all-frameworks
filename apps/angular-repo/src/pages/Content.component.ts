import { Component, Input } from '@angular/core';
import type { userType, commentType, contentType } from 'types';
import { format } from 'date-fns';
import { isValidArray, getFormattedDate } from '../utils/utils';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardComponent } from '../components/Card.component';

@Component({
  selector: 'content',
  imports: [FormsModule, CardComponent],
  template: `@if (content) {
    <main>
      <div class="content-info {{ content.framework }}-shadow">
        <div>
          <h1>{{ content.title }}</h1>
          <img
            src="/public/{{ content.framework }}.svg"
            class="framework-icon"
          />
        </div>
        <div>
          <div class="contents-info">
            <div>
              <img [src]="content.profile" />
              <h4>{{ content.username }}</h4>
            </div>
          </div>
          <h3>{{ content && getFormattedDate(content) }}</h3>
        </div>
      </div>
      <div class="content-main default-shadow">
        <p>{{ content.content }}</p>
      </div>
      <div class="comment-input">
        <textarea
          class="default-shadow"
          [(ngModel)]="commentInputRef"
        ></textarea>
        <button (click)="commentClickHandler()" class="default-shadow">
          comment
        </button>
      </div>
      <div class="contents-container default-shadow">
        <h2>Comment</h2>
        <ol>
          @if (isVaildArray(comments)) {
            @for (comment of comments; track comment.id) {
              <card [props]="{ comment }" />
            }
          } @else {
            <div>No contents</div>
          }
        </ol>
      </div>
    </main>
  } `,
})
export class ContentComponent {
  contentID!: string;
  @Input() content!: contentType;
  private prevContent!: contentType;
  comments: commentType[] = [];
  userData!: userType;

  commentInputRef = '';
  isVaildArray = isValidArray;
  getFormattedDate = getFormattedDate;

  constructor(private route: ActivatedRoute) {
    this.contentID = route.snapshot.params['contentID'];
  }

  fetchContentData = async () => {
    if (this.contentID === '') {
      console.log('no content id');
      return;
    }
    console.log(this.contentID);

    const response = await fetch(`/api/contents/${this.contentID}`, {
      method: 'get',
    });
    if (!response.ok) return;

    const contentResult: contentType = await response.json();
    this.content = { ...contentResult };

    console.log(this.content);
  };

  fetchCommentsData = async () => {
    if (!this.content) {
      console.log('no content');
      return;
    }

    const response = await fetch(`/api/comments?contentID=${this.content.id}`, {
      method: 'get',
    });
    if (!response.ok) return;

    const commentsResult: commentType[] = await response.json();
    this.comments = [...commentsResult];
    console.log(this.comments);
  };

  ngOnInit() {
    const userJson = sessionStorage.getItem('user');
    if (!userJson) return;
    const result = JSON.parse(userJson);
    this.userData = result;

    this.fetchContentData();
  }

  ngDoCheck() {
    if (this.content !== this.prevContent) {
      this.prevContent = this.content;
      console.log('Content changed');
      this.fetchCommentsData();
    }
  }

  commentClickHandler = async () => {
    if (!this.userData) return;

    const commentInput = this.commentInputRef;
    console.log(commentInput);

    if (commentInput && /^\s*$/.test(commentInput)) {
      alert('comments is empty');
      return;
    }

    const response = await fetch('/api/comments', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      //userID, contentID, comment + date
      body: JSON.stringify({
        userID: this.userData.id,
        contentID: this.contentID,
        comment: commentInput,
      }),
    });

    if (response.ok) {
      if (this.commentInputRef) this.commentInputRef = '';

      await this.fetchCommentsData();
    }
  };
}
