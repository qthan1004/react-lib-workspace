import styled from '@emotion/styled';
import { pxToRem } from '@dgtx/utils';
import { IconProps } from './model';

export const IconStyled = styled.span(
  ({ size, color, colorHover }: IconProps) => `
    color: ${color || ''};
    font-size: ${pxToRem(size ?? 18)};
    &:hover {
      color: ${colorHover || ''};
    }
    &[class^='icon-'],
    &[class*=' icon-'] {
      /* use !important to prevent issues with browser extensions that change fonts */
      font-family: 'icomoon' !important;
      speak: never;
      line-height:normal;
      font-style: normal;
      font-weight: normal;
      font-variant: normal;
      text-transform: none;

      /* Better Font Rendering =========== */
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

&.icon-event-busy-outlined:before {
  content: "\\e900";
}
&.icon-pause-circle-filled:before {
  content: "\\e901";
}
&.icon-save:before {
  content: "\\e902";
}
&.icon-qr-code-scanner:before {
  content: "\\e903";
}
&.icon-category:before {
  content: "\\e904";
}
&.icon-credit-card:before {
  content: "\\e905";
}
&.icon-employment:before {
  content: "\\e906";
}
&.icon-female:before {
  content: "\\e907";
}
&.icon-home-work-filled:before {
  content: "\\e908";
}
&.icon-id-card:before {
  content: "\\e909";
}
&.icon-male:before {
  content: "\\e90a";
}
&.icon-manage-account-filled:before {
  content: "\\e90b";
}
&.icon-receipt-long:before {
  content: "\\e90c";
}
&.icon-remove-user:before {
  content: "\\e90d";
}
&.icon-rice-flower-filled:before {
  content: "\\e90e";
}
&.icon-search-details-filled:before {
  content: "\\e90f";
}
&.icon-see-details:before {
  content: "\\e910";
}
&.icon-user-filled:before {
  content: "\\e911";
}
&.icon-dot-filled:before {
  content: "\\e912";
}
&.icon-plus-circle-filled:before {
  content: "\\e913";
}
&.icon-advance-search:before {
  content: "\\e914";
}
&.icon-attach-link:before {
  content: "\\e915";
}
&.icon-thumbnail-filled:before {
  content: "\\e916";
}
&.icon-upload-cloud:before {
  content: "\\e917";
}
&.icon-arrow-go-back:before {
  content: "\\e918";
}
&.icon-unlink:before {
  content: "\\e919";
}
&.icon-add-photo:before {
  content: "\\e91a";
}
&.icon-align-justify:before {
  content: "\\e91b";
}
&.icon-youtube:before {
  content: "\\e91c";
}
&.icon-workflow:before {
  content: "\\e91d";
}
&.icon-monitor-filled:before {
  content: "\\e91e";
}
&.icon-list-numbered:before {
  content: "\\e91f";
}
&.icon-list-bulleted:before {
  content: "\\e920";
}
&.icon-italic:before {
  content: "\\e921";
}
&.icon-indent-increase:before {
  content: "\\e922";
}
&.icon-indent-decrease:before {
  content: "\\e923";
}
&.icon-image:before {
  content: "\\e924";
}
&.icon-underlined:before {
  content: "\\e925";
}
&.icon-bold:before {
  content: "\\e926";
}
&.icon-align-right:before {
  content: "\\e927";
}
&.icon-align-left:before {
  content: "\\e928";
}
&.icon-align-center:before {
  content: "\\e929";
}
&.icon-add-link:before {
  content: "\\e92a";
}
&.icon-fit-page:before {
  content: "\\e92b";
}
&.icon-advance-filter:before {
  content: "\\e92c";
}
&.icon-layout-expanded:before {
  content: "\\e92d";
}
&.icon-batches:before {
  content: "\\e92e";
}
&.icon-warning-outlined:before {
  content: "\\e92f";
}
&.icon-straighten:before {
  content: "\\e930";
}
&.icon-data-history:before {
  content: "\\e931";
}
&.icon-set-blank-outlined:before {
  content: "\\e932";
}
&.icon-data-update:before {
  content: "\\e933";
}
&.icon-docs:before {
  content: "\\e934";
}
&.icon-scanner:before {
  content: "\\e935";
}
&.icon-rotate-90-right:before {
  content: "\\e936";
}
&.icon-rotate-90-left:before {
  content: "\\e937";
}
&.icon-photo-library:before {
  content: "\\e938";
}
&.icon-pause:before {
  content: "\\e939";
}
&.icon-minus-circle:before {
  content: "\\e93a";
}
&.icon-minimize:before {
  content: "\\e93b";
}
&.icon-mail:before {
  content: "\\e93c";
}
&.icon-list-alt:before {
  content: "\\e93d";
}
&.icon-list:before {
  content: "\\e93e";
}
&.icon-folder:before {
  content: "\\e93f";
}
&.icon-fit-width:before {
  content: "\\e940";
}
&.icon-file-text:before {
  content: "\\e941";
}
&.icon-group-docs:before {
  content: "\\e942";
}
&.icon-user-group-full-filled:before {
  content: "\\e943";
}
&.icon-user-group-add:before {
  content: "\\e944";
}
&.icon-guidelines:before {
  content: "\\e945";
}
&.icon-exclamation-circle-filled:before {
  content: "\\e946";
}
&.icon-book:before {
  content: "\\e947";
}
&.icon-instances:before {
  content: "\\e948";
}
&.icon-file-retry:before {
  content: "\\e949";
}
&.icon-monitor:before {
  content: "\\e94a";
}
&.icon-notification-settings:before {
  content: "\\e94b";
}
&.icon-edit-content:before {
  content: "\\e94c";
}
&.icon-file-upload:before {
  content: "\\e94d";
}
&.icon-folder-open:before {
  content: "\\e94e";
}
&.icon-products:before {
  content: "\\e94f";
}
&.icon-project-settings:before {
  content: "\\e950";
}
&.icon-report:before {
  content: "\\e951";
}
&.icon-report-chart:before {
  content: "\\e952";
}
&.icon-tag:before {
  content: "\\e953";
}
&.icon-tasks:before {
  content: "\\e954";
}
&.icon-user-add:before {
  content: "\\e955";
}
&.icon-view-detail:before {
  content: "\\e956";
}
&.icon-warning:before {
  content: "\\e957";
}
&.icon-change-folder:before {
  content: "\\e958";
}
&.icon-clock-circle-filled:before {
  content: "\\e959";
}
&.icon-created:before {
  content: "\\e95a";
}
&.icon-dashboard-filled:before {
  content: "\\e95b";
}
&.icon-details:before {
  content: "\\e95c";
}
&.icon-doc-sets-outlined:before {
  content: "\\e95d";
}
&.icon-draggable:before {
  content: "\\e95e";
}
&.icon-edit-name-outlined:before {
  content: "\\e95f";
}
&.icon-file-zip:before {
  content: "\\e960";
}
&.icon-folder-open-outlined:before {
  content: "\\e961";
}
&.icon-grid-view-filled:before {
  content: "\\e962";
}
&.icon-minus-circle-outlined:before {
  content: "\\e963";
}
&.icon-line-manager:before {
  content: "\\e964";
}
&.icon-filter:before {
  content: "\\e965";
}
&.icon-user:before {
  content: "\\e966";
}
&.icon-plus:before {
  content: "\\e967";
}
&.icon-session:before {
  content: "\\e968";
}
&.icon-warning-circle-filled:before {
  content: "\\e969";
}
&.icon-info:before {
  content: "\\e96a";
}
&.icon-key:before {
  content: "\\e96b";
}
&.icon-search:before {
  content: "\\e96c";
}
&.icon-planet:before {
  content: "\\e96d";
}
&.icon-restore:before {
  content: "\\e96e";
}
&.icon-revision-history:before {
  content: "\\e96f";
}
&.icon-share:before {
  content: "\\e970";
}
&.icon-arrow-caret-left:before {
  content: "\\e971";
}
&.icon-arrow-caret-right:before {
  content: "\\e972";
}
&.icon-arrow-caret-up:before {
  content: "\\e973";
}
&.icon-arrow-double-left:before {
  content: "\\e974";
}
&.icon-arrow-double-right:before {
  content: "\\e975";
}
&.icon-arrow-long-down:before {
  content: "\\e976";
}
&.icon-arrow-long-left:before {
  content: "\\e977";
}
&.icon-arrow-long-right:before {
  content: "\\e978";
}
&.icon-arrow-long-up:before {
  content: "\\e979";
}
&.icon-arrow-short-down:before {
  content: "\\e97a";
}
&.icon-arrow-short-left:before {
  content: "\\e97b";
}
&.icon-arrow-short-right:before {
  content: "\\e97c";
}
&.icon-arrow-short-up:before {
  content: "\\e97d";
}
&.icon-arrow-vertical-left:before {
  content: "\\e97e";
}
&.icon-arrow-vertical-right:before {
  content: "\\e97f";
}
&.icon-checkbox-blank:before {
  content: "\\e980";
}
&.icon-checkbox-indeterminate-filled:before {
  content: "\\e981";
}
&.icon-checkbox-selected-filled:before {
  content: "\\e982";
}
&.icon-checked-circle-blank:before {
  content: "\\e983";
}
&.icon-checked-circle-filled:before {
  content: "\\e984";
}
&.icon-check-filled:before {
  content: "\\e985";
}
&.icon-close-circle-filled:before {
  content: "\\e986";
}
&.icon-close-filled:before {
  content: "\\e987";
}
&.icon-delete:before {
  content: "\\e988";
}
&.icon-dot:before {
  content: "\\e989";
}
&.icon-download-cloud:before {
  content: "\\e98a";
}
&.icon-download-down:before {
  content: "\\e98b";
}
&.icon-edit:before {
  content: "\\e98c";
}
&.icon-eye-available-filled:before {
  content: "\\e98d";
}
&.icon-eye-invisible-filled:before {
  content: "\\e98e";
}
&.icon-home:before {
  content: "\\e98f";
}
&.icon-home-filled:before {
  content: "\\e990";
}
&.icon-log:before {
  content: "\\e991";
}
&.icon-logout:before {
  content: "\\e992";
}
&.icon-nav-collapse:before {
  content: "\\e993";
}
&.icon-nav-expand:before {
  content: "\\e994";
}
&.icon-reload:before {
  content: "\\e995";
}
&.icon-role:before {
  content: "\\e996";
}
&.icon-role-management-filled:before {
  content: "\\e997";
}
&.icon-setting:before {
  content: "\\e998";
}
&.icon-sorter-inactive:before {
  content: "\\e999";
}
&.icon-unlock:before {
  content: "\\e99a";
}
&.icon-user-group:before {
  content: "\\e99b";
}
&.icon-user-group-filled:before {
  content: "\\e99c";
}
&.icon-info-filled:before {
  content: "\\e99d";
}
&.icon-applications:before {
  content: "\\e99e";
}
&.icon-glass-zoom-in:before {
  content: "\\e99f";
}
&.icon-glass-zoom-out:before {
  content: "\\e9a0";
}
&.icon-applications-filled:before {
  content: "\\e9a1";
}
&.icon-arrow-caret-down:before {
  content: "\\e9a2";
}
&.icon-calendar:before {
  content: "\\e9a3";
}
&.icon-approval:before {
  content: "\\e9a4";
}
&.icon-gateway:before {
  content: "\\e9a5";
}
&.icon-notification:before {
  content: "\\e9a6";
}
&.icon-dashboard:before {
  content: "\\e9a7";
}
&.icon-lock:before {
  content: "\\e9a8";
}
&.icon-checked-circle:before {
  content: "\\e9a9";
}
&.icon-close-circle:before {
  content: "\\e9aa";
}
&.icon-copy:before {
  content: "\\e9ab";
}
&.icon-copy-filled:before {
  content: "\\e9ac";
}
&.icon-folder-filled:before {
  content: "\\e9ad";
}
&.icon-inbound:before {
  content: "\\e9ae";
}
&.icon-inbox:before {
  content: "\\e9af";
}
&.icon-outbound:before {
  content: "\\e9b0";
}
&.icon-renew:before {
  content: "\\e9b1";
}
&.icon-send:before {
  content: "\\e9b2";
}
&.icon-setting-filled:before {
  content: "\\e9b3";
}
&.icon-swap-right:before {
  content: "\\e9b4";
}
&.icon-upload:before {
  content: "\\e9b5";
}
&.icon-attachment:before {
  content: "\\e9b6";
}
&.icon-calender-filled:before {
  content: "\\e9b7";
}
&.icon-retry:before {
  content: "\\e9b8";
}
&.icon-database-import:before {
  content: "\\e9b9";
}
&.icon-database-share:before {
  content: "\\e9ba";
}
&.icon-i-warning:before {
  content: "\\e9bb";
}
&.icon-circle:before {
  content: "\\e9bc";
}
&.icon-circle-dot-filled:before {
  content: "\\e9bd";
}
&.icon-done-all:before {
  content: "\\e9be";
}
&.icon-apps:before {
  content: "\\e9bf";
}
&.icon-admin-filled:before {
  content: "\\e9c0";
}
&.icon-face-id:before {
  content: "\\e9c1";
}
&.icon-zoom-in:before {
  content: "\\e9c2";
}
&.icon-zoom-out:before {
  content: "\\e9c3";
}
&.icon-submitted-approval:before {
  content: "\\e9c4";
}
&.icon-update-available:before {
  content: "\\e9c5";
}
&.icon-data-base-filled:before {
  content: "\\e9c6";
}
&.icon-task-warning:before {
  content: "\\e9c7";
}
&.icon-dock-to-bottom:before {
  content: "\\e9c8";
}
&.icon-dock-to-left:before {
  content: "\\e9c9";
}
&.icon-comment:before {
  content: "\\e9ca";
}
&.icon-like-filled:before {
  content: "\\e9cb";
}
&.icon-archive:before {
  content: "\\e9cc";
}
&.icon-bar-chart-filled:before {
  content: "\\e9cd";
}
&.icon-folder-setting-filled:before {
  content: "\\e9ce";
}
&.icon-school-filled:before {
  content: "\\e9cf";
}
&.icon-poor-face:before {
  content: "\\e9d0";
}
&.icon-source-notes-filled:before {
  content: "\\e9d1";
}
&.icon-task-alt:before {
  content: "\\e9d2";
}
&.icon-scan-process-filled:before {
  content: "\\e9d3";
}
&.icon-add-photo-filled:before {
  content: "\\e9d4";
}
&.icon-direction-column:before {
  content: "\\e9d5";
}
&.icon-discard-doc:before {
  content: "\\e9d6";
}
&.icon-component-exchange:before {
  content: "\\e9d7";
}
&.icon-deployment-unit:before {
  content: "\\e9d8";
}
&.icon-operation:before {
  content: "\\e9d9";
}
&.icon-workflow-horizontal:before {
  content: "\\e9da";
}
&.icon-delete-user:before {
  content: "\\e9db";
}
&.icon-sign:before {
  content: "\\e9dc";
}
&.icon-stop-filled:before {
  content: "\\e9dd";
}
&.icon-tree-view-filled:before {
  content: "\\e9de";
}
&.icon-funnel-filled:before {
  content: "\\e9df";
}
&.icon-funnel-outline:before {
  content: "\\e9e0";
}
&.icon-doc-history-filled:before {
  content: "\\e9e1";
}
&.icon-dollar-circle-filled:before {
  content: "\\e9e2";
}
&.icon-dollar-circle-outlined:before {
  content: "\\e9e3";
}
&.icon-security-filled:before {
  content: "\\e9e4";
}
&.icon-download-rounded:before {
  content: "\\e9e5";
}
&.icon-swap:before {
  content: "\\e9e6";
}
&.icon-export-outlined:before {
  content: "\\e9e7";
}
&.icon-import-outlined:before {
  content: "\\e9e8";
}
&.icon-application-plus-filled:before {
  content: "\\e9e9";
}
&.icon-group-three-users-filled:before {
  content: "\\e9ea";
}
&.icon-find-apps-filled:before {
  content: "\\e9eb";
}
&.icon-missile-filled:before {
  content: "\\e9ec";
}
&.icon-not-allow:before {
  content: "\\e9ed";
}
&.icon-report-underline-filled:before {
  content: "\\e9ee";
}
&.icon-service-setting-filled:before {
  content: "\\e9ef";
}
&.icon-change-password:before {
  content: "\\e9f0";
}
&.icon-close-square-filled:before {
  content: "\\e9f1";
}
&.icon-crown-filled:before {
  content: "\\e9f2";
}
&.icon-permissions-filled:before {
  content: "\\e9f3";
}
&.icon-sessions:before {
  content: "\\e9f4";
}
&.icon-stack-filled:before {
  content: "\\e9f5";
}
&.icon-location-outlined:before {
  content: "\\e9f6";
}
&.icon-workflow-vertical:before {
  content: "\\e9f7";
}
&.icon-calendar-lock:before {
  content: "\\e9f8";
}
&.icon-comment-filled:before {
  content: "\\e9f9";
}
&.icon-date-range-outlined:before {
  content: "\\e9fa";
}
&.icon-event-available-outlined:before {
  content: "\\e9fb";
}
&.icon-location-away-filled:before {
  content: "\\e9fc";
}
&.icon-more-time-outlined:before {
  content: "\\e9fd";
}
&.icon-time-sheet-outlined:before {
  content: "\\e9fe";
}`
);
