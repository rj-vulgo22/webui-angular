'use client'

import { type ReactNode } from 'react'

const sections = [
  { id: 'voice-and-tone', title: 'Voice and tone' },
  { id: 'buttons-and-actions', title: 'Buttons and actions' },
  { id: 'form-labels-and-descriptions', title: 'Form labels and descriptions' },
  { id: 'error-messages', title: 'Error messages' },
  { id: 'success-messages', title: 'Success messages' },
  { id: 'tooltips-and-help-text', title: 'Tooltips and help text' },
  { id: 'navigation-and-headings', title: 'Navigation and headings' },
  { id: 'empty-states', title: 'Empty states' },
  { id: 'loading-states', title: 'Loading states' },
  { id: 'confirmations-and-dialogs', title: 'Confirmations and dialogs' },
  { id: 'words-to-avoid', title: 'Words to avoid' },
  { id: 'capitalization', title: 'Capitalization' },
  { id: 'formatting', title: 'Formatting' },
  { id: 'quick-checklist', title: 'Quick checklist' },
]

function SectionLink({ id }: { id: string }) {
  return (
    <a
      className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-primary hover:decoration-2 subheading-anchor"
      aria-label="Link to section"
      href={'#' + id}
    >
      <span className="icon icon-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline h-4 w-4">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      </span>
    </a>
  )
}

function WarningCallout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-warning-200 text-warning-600 px-4 py-3 rounded-md border border-warning-400 my-6 text-sm flex items-start gap-3">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
      <div>{children}</div>
    </div>
  )
}

function BadGoodCards({ bad, good }: { bad: ReactNode; good: ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
      <div className="rounded-lg border border-red-400/50 p-4 bg-red-50 dark:bg-red-950/20">
        <div className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider mb-2">Bad</div>
        {bad}
      </div>
      <div className="rounded-lg border border-green-500/50 p-4 bg-green-50 dark:bg-green-950/20">
        <div className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider mb-2">Good</div>
        {good}
      </div>
    </div>
  )
}

function ComparisonTable({ rows }: { rows: { bad: ReactNode; good: ReactNode }[] }) {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-4 py-2 text-left w-1/3 text-red-600 dark:text-red-400 font-medium">Bad</th>
            <th className="px-4 py-2 text-left w-2/3 text-green-600 dark:text-green-400 font-medium">Good</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b last:border-b-0">
              <td className="px-4 py-2 text-muted-foreground">{row.bad}</td>
              <td className="px-4 py-2">{row.good}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function CopywritingDocPage() {
  return (
    <main className="relative lg:gap-10 xl:grid xl:grid-cols-[1fr_200px] px-8 md:px-16 py-20">
      <div className="mx-auto w-full min-w-0 max-w-4xl">
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">Docs</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-muted-foreground">
            <path d="m9 18 6-6-6-6" />
          </svg>
          <div className="text-foreground">Copywriting</div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-5">
          <div className="space-y-2">
            <h1 className="scroll-m-20 text-2xl lg:text-4xl tracking-tight">Copywriting</h1>
            <p className="text-base lg:text-lg text-muted-foreground">
              <span style={{ display: 'inline-block', verticalAlign: 'top', textDecoration: 'inherit', textWrap: 'balance' }}>
                A concise guide for writing UI copy in Supabase.
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-col -space-y-px"></div>

        <div className="pb-12">
          <div className="mdx">
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Write UI copy that helps developers complete tasks quickly. Be direct, action-oriented, and respectful of developer time.
            </p>

            <h2 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="voice-and-tone">
              <SectionLink id="voice-and-tone" /> Voice and tone
            </h2>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Supabase UI copy is:
            </p>
            <ul className="my-6 ml-6 list-disc text-foreground/70">
              <li className="mt-2"><strong>Direct</strong>: Say what something does, not what it "enables" you to do.</li>
              <li className="mt-2"><strong>Action-oriented</strong>: Focus on what happens, not what we built.</li>
              <li className="mt-2"><strong>Technical without jargon</strong>: Use precise terms but explain when necessary.</li>
              <li className="mt-2"><strong>Pragmatic</strong>: Acknowledge tradeoffs and limitations when relevant.</li>
            </ul>

            <h2 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="buttons-and-actions">
              <SectionLink id="buttons-and-actions" /> Buttons and actions
            </h2>

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight" id="use-verbs-not-nouns">
              <SectionLink id="use-verbs-not-nouns" /> Use verbs, not nouns
            </h3>

            <BadGoodCards
              bad={
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm font-medium bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 border-red-300 dark:border-red-700">Table creation</span>
                  <span className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm font-medium bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 border-red-300 dark:border-red-700">Save action</span>
                  <span className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm font-medium bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 border-red-300 dark:border-red-700">Bucket deletion</span>
                </div>
              }
              good={
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm font-medium bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 border-green-300 dark:border-green-700">Create table</span>
                  <span className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm font-medium bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 border-green-300 dark:border-green-700">Save changes</span>
                  <span className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm font-medium bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 border-green-300 dark:border-green-700">Delete bucket</span>
                </div>
              }
            />

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight" id="be-specific-about-outcomes">
              <SectionLink id="be-specific-about-outcomes" /> Be specific about outcomes
            </h3>

            <ComparisonTable rows={[
              { bad: '"Remove"', good: '"Delete project"' },
              { bad: '"Change"', good: '"Revoke access"' },
              { bad: '"Configure"', good: '"Enable RLS"' },
            ]} />

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight" id="match-button-text-to-the-action">
              <SectionLink id="match-button-text-to-the-action" /> Match button text to the action
            </h3>

            <ComparisonTable rows={[
              { bad: <><span className="text-muted-foreground">Action: </span><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs">Primary action:</code><br /><span className="text-red-600 dark:text-red-400">"Submit"</span></>, good: <><span className="text-muted-foreground">Action: </span><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs">Primary action:</code><br /><span className="text-green-600 dark:text-green-400">"Create table"</span></> },
              { bad: <><span className="text-muted-foreground">Action: </span><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs">Secondary action:</code><br /><span className="text-red-600 dark:text-red-400">"Go back"</span></>, good: <><span className="text-muted-foreground">Action: </span><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs">Secondary action:</code><br /><span className="text-green-600 dark:text-green-400">"Cancel"</span></> },
            ]} />

            <h2 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="form-labels-and-descriptions">
              <SectionLink id="form-labels-and-descriptions" /> Form labels and descriptions
            </h2>

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight" id="labels-describe-the-field-not-the-feature">
              <SectionLink id="labels-describe-the-field-not-the-feature" /> Labels describe the field, not the feature
            </h3>

            <BadGoodCards
              bad={
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-red-600 dark:text-red-400">Name your table</label>
                  <div className="h-9 rounded-md border border-red-300 bg-red-50 dark:bg-red-950/30 px-3 py-1 text-sm text-muted-foreground">users</div>
                  <p className="text-xs text-red-500">This field allows you to specify a name for your table using letters, numbers, and underscores</p>
                </div>
              }
              good={
                <div className="space-y-1">
                  <label className="block text-sm font-medium">Table name</label>
                  <div className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm">users</div>
                  <p className="text-xs text-muted-foreground">Letters, numbers, and underscores only</p>
                </div>
              }
            />

            <ComparisonTable rows={[
              {
                bad: <><span className="text-muted-foreground">Label: </span><span className="text-red-600 dark:text-red-400">"Name your table"</span><br /><span className="text-muted-foreground">Description: </span><span className="text-red-600 dark:text-red-400">"This field allows you to specify a name for your table using letters, numbers, and underscores"</span></>,
                good: <><span className="text-muted-foreground">Label: </span><span className="text-green-600 dark:text-green-400">"Table name"</span><br /><span className="text-muted-foreground">Description: </span><span className="text-green-600 dark:text-green-400">"Letters, numbers, and underscores only"</span></>,
              },
            ]} />

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight" id="descriptions-explain-constraints-not-concepts">
              <SectionLink id="descriptions-explain-constraints-not-concepts" /> Descriptions explain constraints, not concepts
            </h3>

            <ComparisonTable rows={[
              { bad: '"This ensures your table name is unique"', good: '"Must be unique within the schema"' },
              { bad: '"You can enter up to 255 characters here"', good: '"Maximum 255 characters"' },
              { bad: '"This field is required when using Row Level Security policies"', good: '"Required for RLS policies"' },
            ]} />

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight" id="use-present-tense">
              <SectionLink id="use-present-tense" /> Use present tense
            </h3>

            <ComparisonTable rows={[
              { bad: '"Will store connection pool settings"', good: '"Stores connection pool settings"' },
              { bad: '"This will limit query execution time"', good: '"Limits query execution time"' },
            ]} />

            <h2 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="error-messages">
              <SectionLink id="error-messages" /> Error messages
            </h2>

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight" id="state-what-went-wrong-then-how-to-fix-it">
              <SectionLink id="state-what-went-wrong-then-how-to-fix-it" /> State what went wrong, then how to fix it
            </h3>

            <BadGoodCards
              bad={
                <div className="rounded-md border border-red-300 bg-red-50 dark:bg-red-950/30 p-3 flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-red-500"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                  <div>
                    <p className="text-sm font-medium text-red-700 dark:text-red-300">Something went wrong. Please try again.</p>
                  </div>
                </div>
              }
              good={
                <div className="rounded-md border border-red-300 bg-red-50 dark:bg-red-950/30 p-3 flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-red-500"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                  <div>
                    <p className="text-sm font-medium text-red-700 dark:text-red-300">Invalid API key. Check your project settings.</p>
                  </div>
                </div>
              }
            />

            <ComparisonTable rows={[
              { bad: '"An error occurred"', good: '"Table name already exists. Choose a different name."' },
              { bad: '"Something went wrong. Please try again."', good: '"Invalid API key. Check your project settings."' },
            ]} />

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight" id="be-specific-about-the-problem">
              <SectionLink id="be-specific-about-the-problem" /> Be specific about the problem
            </h3>

            <ComparisonTable rows={[
              { bad: '"Invalid input"', good: '"Password must be at least 8 characters"' },
              { bad: '"Connection error"', good: '"Connection failed: timeout after 30 seconds"' },
            ]} />

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight" id="avoid-blame-or-apology">
              <SectionLink id="avoid-blame-or-apology" /> Avoid blame or apology
            </h3>

            <ComparisonTable rows={[
              { bad: '"Sorry, we couldn\'t connect"', good: '"Unable to connect to database"' },
              { bad: '"Oops! Something went wrong"', good: '"Table creation failed: column name is reserved"' },
            ]} />

            <h2 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="success-messages">
              <SectionLink id="success-messages" /> Success messages
            </h2>

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight" id="confirm-what-happened">
              <SectionLink id="confirm-what-happened" /> Confirm what happened
            </h3>

            <BadGoodCards
              bad={
                <div className="rounded-md border border-green-300 bg-green-50 dark:bg-green-950/30 p-3 flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                  <div>
                    <p className="text-sm font-medium text-green-700 dark:text-green-300">Success!</p>
                  </div>
                </div>
              }
              good={
                <div className="rounded-md border border-green-300 bg-green-50 dark:bg-green-950/30 p-3 flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                  <div>
                    <p className="text-sm font-medium text-green-700 dark:text-green-300">Table created successfully</p>
                  </div>
                </div>
              }
            />

            <ComparisonTable rows={[
              { bad: '"Success!"', good: '"Table created successfully"' },
              { bad: '"Done"', good: '"API key revoked"' },
              { bad: '"Operation completed"', good: '"Changes saved"' },
            ]} />

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight" id="keep-it-brief">
              <SectionLink id="keep-it-brief" /> Keep it brief
            </h3>

            <ComparisonTable rows={[
              { bad: '"Your backup has been successfully restored to your database"', good: '"Backup restored"' },
              { bad: '"The migration has been applied successfully to your project"', good: '"Migration applied"' },
            ]} />

            <h2 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="tooltips-and-help-text">
              <SectionLink id="tooltips-and-help-text" /> Tooltips and help text
            </h2>

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight" id="explain-why-not-what">
              <SectionLink id="explain-why-not-what" /> Explain why, not what
            </h3>

            <BadGoodCards
              bad={
                <div className="inline-flex items-center gap-2 rounded-md border bg-background px-3 py-1.5 text-sm shadow-sm">
                  <span>This is a toggle switch</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                </div>
              }
              good={
                <div className="inline-flex items-center gap-2 rounded-md border bg-background px-3 py-1.5 text-sm shadow-sm">
                  <span>Enables real-time subscriptions for this table</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                </div>
              }
            />

            <ComparisonTable rows={[
              { bad: '"This is a toggle switch"', good: '"Enables real-time subscriptions for this table"' },
              { bad: '"Click to delete"', good: '"Prevents accidental deletions"' },
            ]} />

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight" id="one-sentence-maximum">
              <SectionLink id="one-sentence-maximum" /> One sentence maximum
            </h3>

            <ComparisonTable rows={[
              { bad: '"Row Level Security restricts access based on user policies. When enabled, users can only access rows that match their policy conditions."', good: '"Restricts access based on user policies"' },
              { bad: '"This setting controls the maximum number of concurrent connections that can be established to your database at any given time."', good: '"Maximum number of concurrent connections"' },
            ]} />

            <h2 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="navigation-and-headings">
              <SectionLink id="navigation-and-headings" /> Navigation and headings
            </h2>

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight" id="use-title-case-for-page-titles-and-global-navigation">
              <SectionLink id="use-title-case-for-page-titles-and-global-navigation" /> Use title case for page titles and global navigation
            </h3>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Use title case for page names in the main nav and document titles (e.g. "Database Settings", "Project Settings"). This distinguishes the page as a destination from section labels and in-page headings, which use sentence case.
            </p>

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight" id="use-declarative-page-descriptions">
              <SectionLink id="use-declarative-page-descriptions" /> Use declarative page descriptions
            </h3>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Use a fragment with no trailing period, and prefer declarative over instructional. Describe what the page covers, not what the user should do.
            </p>

            <ComparisonTable rows={[
              { good: '"General configuration, domains, ownership, and lifecycle"', bad: '"Configure general options, domains, transfers, and project lifecycle"' },
            ]} />

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight" id="use-sentence-case-for-section-labels-and-headings">
              <SectionLink id="use-sentence-case-for-section-labels-and-headings" /> Use sentence case for section labels and headings
            </h3>

            <ComparisonTable rows={[
              { bad: '"Set Up Authentication"', good: '"Set up authentication"' },
              { bad: '"Database Settings"', good: '"Database settings"' },
              { bad: '"Create New Project"', good: '"Create new project"' },
            ]} />

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight" id="headings-describe-the-page-not-the-feature">
              <SectionLink id="headings-describe-the-page-not-the-feature" /> Headings describe the page, not the feature
            </h3>

            <ComparisonTable rows={[
              { bad: '"Manage your API keys"', good: '"API keys"' },
              { bad: '"Configure connection pooling"', good: '"Connection pooling"' },
              { bad: '"Edit your tables"', good: '"Table editor"' },
            ]} />

            <h2 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="empty-states">
              <SectionLink id="empty-states" /> Empty states
            </h2>

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight" id="explain-whats-missing-then-how-to-add-it">
              <SectionLink id="explain-whats-missing-then-how-to-add-it" /> Explain what's missing, then how to add it
            </h3>

            <BadGoodCards
              bad={
                <div className="text-center py-8 px-4">
                  <p className="text-sm text-muted-foreground">You don't have any tables</p>
                </div>
              }
              good={
                <div className="text-center py-8 px-4">
                  <p className="text-sm text-muted-foreground mb-3">No tables yet. Create your first table to get started.</p>
                  <button className="inline-flex items-center justify-center rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 transition-opacity disabled:pointer-events-none disabled:opacity-50">Create table</button>
                </div>
              }
            />

            <ComparisonTable rows={[
              { bad: '"You don\'t have any tables"', good: '"No tables yet. Create your first table to get started."' },
              { bad: '"There are no API keys available"', good: '"No API keys. Generate a key to connect your application."' },
            ]} />

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight" id="include-the-action">
              <SectionLink id="include-the-action" /> Include the action
            </h3>

            <ComparisonTable rows={[
              { bad: '"No buckets found"', good: '"No buckets yet. [Create bucket] button"' },
              { bad: '"No functions available"', good: '"No functions deployed. [Deploy function] button"' },
            ]} />

            <h2 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="loading-states">
              <SectionLink id="loading-states" /> Loading states
            </h2>

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight" id="describe-whats-happening">
              <SectionLink id="describe-whats-happening" /> Describe what's happening
            </h3>

            <BadGoodCards
              bad={
                <div className="space-y-3">
                  <div className="flex items-center gap-3 rounded-md border bg-background px-4 py-3 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin text-muted-foreground"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                    <span className="text-red-600 dark:text-red-400">Please wait...</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-md border bg-background px-4 py-3 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin text-muted-foreground"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                    <span className="text-red-600 dark:text-red-400">Loading...</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-md border bg-background px-4 py-3 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin text-muted-foreground"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                    <span className="text-red-600 dark:text-red-400">Processing...</span>
                  </div>
                </div>
              }
              good={
                <div className="space-y-3">
                  <div className="flex items-center gap-3 rounded-md border bg-background px-4 py-3 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin text-muted-foreground"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                    <span>Creating table...</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-md border bg-background px-4 py-3 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin text-muted-foreground"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                    <span>Loading schema...</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-md border bg-background px-4 py-3 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin text-muted-foreground"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                    <span>Deleting project...</span>
                  </div>
                </div>
              }
            />

            <ComparisonTable rows={[
              { bad: '"Please wait..." (for Create table)', good: '"Creating table..."' },
              { bad: '"Please wait..." (for Save changes)', good: '"Saving changes..."' },
            ]} />

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight" id="match-the-action-verb">
              <SectionLink id="match-the-action-verb" /> Match the action verb
            </h3>

            <ComparisonTable rows={[
              { bad: <><span className="text-muted-foreground">Action: </span><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs">"Delete project"</code><span className="text-muted-foreground"> → Loading: </span><span className="text-red-600 dark:text-red-400">"Processing..."</span></>, good: <><span className="text-muted-foreground">Action: </span><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs">"Delete project"</code><span className="text-muted-foreground"> → Loading: </span><span className="text-green-600 dark:text-green-400">"Deleting project..."</span></> },
              { bad: <><span className="text-muted-foreground">Action: </span><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs">"Save changes"</code><span className="text-muted-foreground"> → Loading: </span><span className="text-red-600 dark:text-red-400">"Please wait..."</span></>, good: <><span className="text-muted-foreground">Action: </span><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs">"Save changes"</code><span className="text-muted-foreground"> → Loading: </span><span className="text-green-600 dark:text-green-400">"Saving changes..."</span></> },
            ]} />

            <h2 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="confirmations-and-dialogs">
              <SectionLink id="confirmations-and-dialogs" /> Confirmations and dialogs
            </h2>

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight" id="state-consequences-clearly">
              <SectionLink id="state-consequences-clearly" /> State consequences clearly
            </h3>

            <BadGoodCards
              bad={
                <div className="rounded-lg border bg-background p-4 shadow-sm space-y-4">
                  <h4 className="text-base font-medium">Are you sure?</h4>
                  <p className="text-sm text-muted-foreground">All data will be removed if this project is deleted</p>
                  <div className="flex items-center justify-end gap-2">
                    <button className="inline-flex items-center justify-center rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-muted/50 transition-colors">Cancel</button>
                    <button className="inline-flex items-center justify-center rounded-md bg-destructive px-3 py-1.5 text-sm font-medium text-destructive-foreground hover:opacity-90 transition-opacity">Delete</button>
                  </div>
                </div>
              }
              good={
                <div className="rounded-lg border bg-background p-4 shadow-sm space-y-4">
                  <h4 className="text-base font-medium">Delete this project?</h4>
                  <p className="text-sm text-muted-foreground">This action cannot be undone and will permanently delete all data.</p>
                  <div className="flex items-center justify-end gap-2">
                    <button className="inline-flex items-center justify-center rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-muted/50 transition-colors">Cancel</button>
                    <button className="inline-flex items-center justify-center rounded-md bg-destructive px-3 py-1.5 text-sm font-medium text-destructive-foreground hover:opacity-90 transition-opacity">Delete project</button>
                  </div>
                </div>
              }
            />

            <ComparisonTable rows={[
              { bad: '"Are you sure?"', good: '"Delete this project? This action cannot be undone and will permanently delete all data."' },
              { bad: '"This action is permanent. Continue?"', good: '"Revoke this API key? Applications using this key will stop working immediately."' },
            ]} />

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight" id="use-active-voice">
              <SectionLink id="use-active-voice" /> Use active voice
            </h3>

            <ComparisonTable rows={[
              { bad: '"All data will be removed if this project is deleted"', good: '"Deleting this project will remove all data"' },
              { bad: '"Existing connections will be broken if this key is revoked"', good: '"Revoking this key will break existing connections"' },
            ]} />

            <h2 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="words-to-avoid">
              <SectionLink id="words-to-avoid" /> Words to avoid
            </h2>

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight" id="marketing-language">
              <SectionLink id="marketing-language" /> Marketing language
            </h3>

            <ComparisonTable rows={[
              { bad: '"Easily create tables"', good: '"Create tables"' },
              { bad: '"Simply configure settings"', good: '"Configure settings"' },
              { bad: '"Powerful database features"', good: '"Database features"' },
            ]} />

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight" id="vague-verbs">
              <SectionLink id="vague-verbs" /> Vague verbs
            </h3>

            <ComparisonTable rows={[
              { bad: '"Manage tables"', good: '"Create, edit, or delete tables"' },
              { bad: '"Handle errors"', good: '"View and resolve errors"' },
              { bad: '"Work with data"', good: '"Query and update data"' },
            ]} />

            <h2 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="capitalization">
              <SectionLink id="capitalization" /> Capitalization
            </h2>
            <ul className="my-6 ml-6 list-disc text-foreground/70">
              <li className="mt-2"><strong>Sentence case</strong> for all UI text (buttons, labels, section headings)</li>
              <li className="mt-2"><strong>Title case</strong> for page names in navigation</li>
              <li className="mt-2"><strong>Product names:</strong> Database, Auth, Storage, Edge Functions, Realtime, Vector</li>
              <li className="mt-2"><strong>Postgres</strong>, not PostgreSQL</li>
              <li className="mt-2"><strong>Supabase</strong> (capitalize except in code)</li>
            </ul>

            <h2 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="formatting">
              <SectionLink id="formatting" /> Formatting
            </h2>
            <ul className="my-6 ml-6 list-disc text-foreground/70">
              <li className="mt-2"><strong>Bold for emphasis</strong> only when necessary</li>
              <li className="mt-2"><strong>Inline code</strong> for technical terms: <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">RLS</code>, <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">API key</code>, <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">supabase init</code></li>
              <li className="mt-2"><strong>No italics</strong> for emphasis</li>
              <li className="mt-2"><strong>No exclamation marks</strong> unless critical (e.g., destructive actions)</li>
            </ul>

            <h2 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="quick-checklist">
              <SectionLink id="quick-checklist" /> Quick checklist
            </h2>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Before publishing UI copy, ask:
            </p>
            <ul className="my-6 ml-6 list-disc text-foreground/70">
              <li className="mt-2">Does it use an action verb?</li>
              <li className="mt-2">Is it specific about what happens?</li>
              <li className="mt-2">Can a developer complete the task without reading more?</li>
              <li className="mt-2">Does it avoid marketing language?</li>
              <li className="mt-2">Is it in sentence case?</li>
              <li className="mt-2">Is it one sentence or less (for labels, buttons, tooltips)?</li>
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-between border-t py-8">
          <a
            href="/color-usage"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            onClick={(e) => {
              e.preventDefault()
              window.location.hash = '/color-usage'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            <span>
              <span className="block text-xs">Previous</span>
              <span className="block font-medium">Color Usage</span>
            </span>
          </a>
          <a
            href="/icons"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors text-right"
            onClick={(e) => {
              e.preventDefault()
              window.location.hash = '/icons'
            }}
          >
            <span>
              <span className="block text-xs">Next</span>
              <span className="block font-medium">Icons</span>
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </a>
        </div>
      </div>

      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 pt-4">
          <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] py-12">
            <div className="space-y-2">
              <p className="font-medium text-muted-foreground">On This Page</p>
              <ul className="m-0 list-none">
                {sections.map((s) => (
                  <li key={s.id} className="mt-0 pt-2">
                    <a
                      href={'#' + s.id}
                      className="inline-block no-underline transition-colors hover:text-foreground text-muted-foreground"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
