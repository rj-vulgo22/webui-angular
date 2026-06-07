import {w,b,k,m as m$1}from'./chunk-ClJ_kcWH.js';import {Y,C}from'./main-4IPYUJEE.js';var e=Y(C(),1);var d=[{id:"installation",title:"Installation"},{id:"folder-structure",title:"Folder structure"},{id:"introduction",title:"Introduction"},{id:"usage",title:"Usage"},{id:"props",title:"Props"},{id:"further-reading",title:"Further reading"}],c={npm:"npx shadcn@latest add https://supabase.com/ui/r/dropzone-nextjs.json",pnpm:"pnpm dlx shadcn@latest add https://supabase.com/ui/r/dropzone-nextjs.json",yarn:"yarn dlx shadcn@latest add https://supabase.com/ui/r/dropzone-nextjs.json",bun:"bunx shadcn@latest add https://supabase.com/ui/r/dropzone-nextjs.json"},m=[{name:"components",type:"folder",open:true,children:[{name:"dropzone.tsx",type:"file"}]},{name:"hooks",type:"folder",open:true,children:[{name:"use-supabase-upload.ts",type:"file"}]},{name:"lib",type:"folder",open:true,children:[{name:"supabase",type:"folder",open:true,children:[{name:"client.ts",type:"file"},{name:"middleware.ts",type:"file"},{name:"server.ts",type:"file"}]}]}],p=`'use client'

import { CheckCircle, File, Loader2, Upload, X } from 'lucide-react'
import { createContext, useCallback, useContext, type PropsWithChildren } from 'react'

import { cn } from '@/lib/utils'
import { type UseSupabaseUploadReturn } from '@/hooks/use-supabase-upload'
import { Button } from '@/components/ui/button'

export const formatBytes = (
  bytes: number,
  decimals = 2,
  size?: 'bytes' | 'KB' | 'MB' | 'GB' | 'TB' | 'PB' | 'EB' | 'ZB' | 'YB'
) => {
  const k = 1000
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  if (bytes === 0 || bytes === undefined) return size !== undefined ? \`0 \${size}\` : '0 bytes'
  const i = size !== undefined ? sizes.indexOf(size) : Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

type DropzoneContextType = Omit<UseSupabaseUploadReturn, 'getRootProps' | 'getInputProps'>

const DropzoneContext = createContext<DropzoneContextType | undefined>(undefined)

type DropzoneProps = UseSupabaseUploadReturn & {
  className?: string
}

const Dropzone = ({
  className,
  children,
  getRootProps,
  getInputProps,
  ...restProps
}: PropsWithChildren<DropzoneProps>) => {
  const isSuccess = restProps.isSuccess
  const isActive = restProps.isDragActive
  const isInvalid =
    (restProps.isDragActive && restProps.isDragReject) ||
    (restProps.errors.length > 0 && !restProps.isSuccess) ||
    restProps.files.some((file) => file.errors.length !== 0)

  return (
    <DropzoneContext.Provider value={{ ...restProps }}>
      <div
        {...getRootProps({
          className: cn(
            'border-2 border-gray-300 rounded-lg p-6 text-center bg-card transition-colors duration-300 text-foreground',
            className,
            isSuccess ? 'border-solid' : 'border-dashed',
            isActive && 'border-primary bg-primary/10',
            isInvalid && 'border-destructive bg-destructive/10'
          ),
        })}
      >
        <input {...getInputProps()} />
        {children}
      </div>
    </DropzoneContext.Provider>
  )
}
const DropzoneContent = ({ className }: { className?: string }) => {
  const {
    files,
    setFiles,
    onUpload,
    loading,
    successes,
    errors,
    maxFileSize,
    maxFiles,
    isSuccess,
  } = useDropzoneContext()

  const exceedMaxFiles = files.length > maxFiles

  const handleRemoveFile = useCallback(
    (fileName: string) => {
      setFiles(files.filter((file) => file.name !== fileName))
    },
    [files, setFiles]
  )

  if (isSuccess) {
    return (
      <div className={cn('flex flex-row items-center gap-x-2 justify-center', className)}>
        <CheckCircle size={16} className="text-primary" />
        <p className="text-primary text-sm">
          Successfully uploaded {files.length} file{files.length > 1 ? 's' : ''}
        </p>
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col', className)}>
      {files.map((file, idx) => {
        const fileError = errors.find((e) => e.name === file.name)
        const isSuccessfullyUploaded = !!successes.find((e) => e === file.name)

        return (
          <div
            key={\`\${file.name}-\${idx}\`}
            className="flex items-center gap-x-4 border-b py-2 first:mt-4 last:mb-4 "
          >
            {file.type.startsWith('image/') ? (
              <div className="h-10 w-10 rounded-sm border overflow-hidden shrink-0 bg-muted flex items-center justify-center">
                <img src={file.preview} alt={file.name} className="object-cover" />
              </div>
            ) : (
              <div className="h-10 w-10 rounded-sm border bg-muted flex items-center justify-center">
                <File size={18} />
              </div>
            )}

            <div className="shrink grow flex flex-col items-start truncate">
              <p title={file.name} className="text-sm truncate max-w-full">
                {file.name}
              </p>
              {file.errors.length > 0 ? (
                <p className="text-xs text-destructive">
                  {file.errors
                    .map((e) =>
                      e.message.startsWith('File is larger than')
                        ? \`File is larger than \${formatBytes(maxFileSize, 2)} (Size: \${formatBytes(file.size, 2)})\`
                        : e.message
                    )
                    .join(', ')}
                </p>
              ) : loading && !isSuccessfullyUploaded ? (
                <p className="text-xs text-muted-foreground">Uploading file...</p>
              ) : !!fileError ? (
                <p className="text-xs text-destructive">Failed to upload: {fileError.message}</p>
              ) : isSuccessfullyUploaded ? (
                <p className="text-xs text-primary">Successfully uploaded file</p>
              ) : (
                <p className="text-xs text-muted-foreground">{formatBytes(file.size, 2)}</p>
              )}
            </div>

            {!loading && !isSuccessfullyUploaded && (
              <Button
                size="icon"
                variant="link"
                className="shrink-0 justify-self-end text-muted-foreground hover:text-foreground"
                onClick={() => handleRemoveFile(file.name)}
              >
                <X />
              </Button>
            )}
          </div>
        )
      })}
      {exceedMaxFiles && (
        <p className="text-sm text-left mt-2 text-destructive">
          You may upload only up to {maxFiles} files, please remove {files.length - maxFiles} file
          {files.length - maxFiles > 1 ? 's' : ''}.
        </p>
      )}
      {files.length > 0 && !exceedMaxFiles && (
        <div className="mt-2">
          <Button
            variant="outline"
            onClick={onUpload}
            disabled={files.some((file) => file.errors.length !== 0) || loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>Upload files</>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}

const DropzoneEmptyState = ({ className }: { className?: string }) => {
  const { maxFiles, maxFileSize, inputRef, isSuccess } = useDropzoneContext()

  if (isSuccess) {
    return null
  }

  return (
    <div className={cn('flex flex-col items-center gap-y-2', className)}>
      <Upload size={20} className="text-muted-foreground" />
      <p className="text-sm">
        Upload{!!maxFiles && maxFiles > 1 ? \` \${maxFiles}\` : ''} file
        {!maxFiles || maxFiles > 1 ? 's' : ''}
      </p>
      <div className="flex flex-col items-center gap-y-1">
        <p className="text-xs text-muted-foreground">
          Drag and drop or{' '}
          <a
            onClick={() => inputRef.current?.click()}
            className="underline cursor-pointer transition hover:text-foreground"
          >
            select {maxFiles === 1 ? \`file\` : 'files'}
          </a>{' '}
          to upload
        </p>
        {maxFileSize !== Number.POSITIVE_INFINITY && (
          <p className="text-xs text-muted-foreground">
            Maximum file size: {formatBytes(maxFileSize, 2)}
          </p>
        )}
      </div>
    </div>
  )
}

const useDropzoneContext = () => {
  const context = useContext(DropzoneContext)

  if (!context) {
    throw new Error('useDropzoneContext must be used within a Dropzone')
  }

  return context
}

export { Dropzone, DropzoneContent, DropzoneEmptyState, useDropzoneContext }`,u=`'use client'

import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/dropzone'
import { useSupabaseUpload } from '@/hooks/use-supabase-upload'

const FileUploadDemo = () => {
  const props = useSupabaseUpload({
    bucketName: 'test',
    path: 'test',
    allowedMimeTypes: ['image/*'],
    maxFiles: 2,
    maxFileSize: 1000 * 1000 * 10, // 10MB,
  })

  return (
    <div className="w-[500px]">
      <Dropzone {...props}>
        <DropzoneEmptyState />
        <DropzoneContent />
      </Dropzone>
    </div>
  )
}

export { FileUploadDemo }`;function h(){return (0, e.jsxs)("main",{className:"relative lg:gap-10 xl:grid xl:grid-cols-[1fr_200px] px-8 md:px-16 py-20",children:[(0, e.jsxs)("div",{className:"mx-auto w-full min-w-0 max-w-4xl",children:[(0, e.jsxs)("div",{className:"mb-4 flex items-center space-x-1 text-sm text-muted-foreground",children:[(0, e.jsx)("div",{className:"overflow-hidden text-ellipsis whitespace-nowrap",children:"Docs"}),(0, e.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"h-4 w-4 text-muted-foreground",children:(0, e.jsx)("path",{d:"m9 18 6-6-6-6"})}),(0, e.jsx)("div",{className:"text-muted-foreground",children:"Dropzone (File Upload)"})]}),(0, e.jsx)("div",{className:"flex flex-col lg:flex-row lg:items-end justify-between mb-5",children:(0, e.jsxs)("div",{className:"space-y-2",children:[(0, e.jsx)("h1",{className:"scroll-m-20 text-2xl lg:text-4xl tracking-tight",children:"Dropzone (File Upload)"}),(0, e.jsx)("p",{className:"text-base lg:text-lg text-muted-foreground",children:(0, e.jsx)("span",{style:{display:"inline-block",verticalAlign:"top",textDecoration:"inherit",textWrap:"balance"},children:"Displays a control for easier uploading of files directly to Supabase Storage"})})]})}),(0, e.jsx)("div",{className:"pb-12",children:(0, e.jsxs)("div",{className:"mdx",children:[(0, e.jsxs)("h2",{className:"font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0",id:"installation",children:[(0, e.jsx)(w,{id:"installation"})," Installation"]}),(0, e.jsx)(b,{installCommands:c}),(0, e.jsxs)("h2",{className:"font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0",id:"folder-structure",children:[(0, e.jsx)(w,{id:"folder-structure"})," Folder structure"]}),(0, e.jsx)(k,{fileTree:m,note:(0, e.jsxs)(e.Fragment,{children:["This block includes the ",(0, e.jsx)("a",{href:"/client",className:"underline decoration-1 underline-offset-4 hover:decoration-primary",children:"Supabase client"}),". If you already have one installed, you can skip overwriting it."]})}),(0, e.jsxs)("div",{className:"mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border py-4 text-foreground/70 bg-muted/20 relative",children:[(0, e.jsx)("pre",{className:"px-4",children:(0, e.jsx)("code",{children:p.split(`
`).map((t,s)=>(0, e.jsxs)("div",{children:[(0, e.jsx)("span",{className:"select-none text-muted-foreground/40 mr-4 inline-block w-8 text-right",children:s+1}),(0, e.jsx)("span",{children:t||" "})]},s))})}),(0, e.jsx)(m$1,{})]}),(0, e.jsxs)("h2",{className:"font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0",id:"introduction",children:[(0, e.jsx)(w,{id:"introduction"})," Introduction"]}),(0, e.jsx)("p",{className:"leading-7 not-first:mt-6 text-foreground/70",children:"Uploading files should be easy\u2014this component handles the tricky parts for you."}),(0, e.jsx)("p",{className:"leading-7 not-first:mt-6 text-foreground/70",children:"The File Upload component makes it easy to add file uploads to your app, with built-in support for drag-and-drop, file type restrictions, image previews, and configurable limits on file size and number of files. All the essentials, ready to go."}),(0, e.jsx)("p",{className:"font-heading mt-8 scroll-m-20 text-xl tracking-tight font-semibold text-foreground",children:"Features"}),(0, e.jsxs)("ul",{className:"my-6 ml-6 list-disc text-foreground/70",children:[(0, e.jsx)("li",{className:"mt-2",children:"Drag-and-drop support"}),(0, e.jsx)("li",{className:"mt-2",children:"Multiple file uploads"}),(0, e.jsx)("li",{className:"mt-2",children:"File size and count limits"}),(0, e.jsx)("li",{className:"mt-2",children:"Image previews for supported file types"}),(0, e.jsx)("li",{className:"mt-2",children:"MIME type restrictions"}),(0, e.jsx)("li",{className:"mt-2",children:"Invalid file handling"}),(0, e.jsx)("li",{className:"mt-2",children:"Success and error states with clear feedback"})]}),(0, e.jsxs)("h2",{className:"font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0",id:"usage",children:[(0, e.jsx)(w,{id:"usage"})," Usage"]}),(0, e.jsxs)("p",{className:"leading-7 not-first:mt-6 text-foreground/70",children:["Simply add this ",(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"<Dropzone />"})," component to your page and it will handle the rest."]}),(0, e.jsxs)("p",{className:"leading-7 not-first:mt-6 text-foreground/70",children:["For control over file upload, you can pass in a ",(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"props"})," object to the component."]}),(0, e.jsxs)("div",{className:"mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border py-4 text-foreground/70 bg-muted/20 relative",children:[(0, e.jsx)("pre",{className:"px-4",children:(0, e.jsx)("code",{children:u.split(`
`).map((t,s)=>(0, e.jsx)("div",{children:t},s))})}),(0, e.jsx)(m$1,{})]}),(0, e.jsxs)("h2",{className:"font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0",id:"props",children:[(0, e.jsx)(w,{id:"props"})," Props"]}),(0, e.jsx)("div",{className:"my-6 w-full overflow-y-auto",children:(0, e.jsxs)("table",{className:"w-full",children:[(0, e.jsx)("thead",{children:(0, e.jsxs)("tr",{className:"m-0 border-t p-0 even:bg-muted",children:[(0, e.jsx)("th",{className:"border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",children:"Prop"}),(0, e.jsx)("th",{className:"border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",children:"Type"}),(0, e.jsx)("th",{className:"border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",children:"Default"}),(0, e.jsx)("th",{className:"border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",children:"Description"})]})}),(0, e.jsxs)("tbody",{children:[(0, e.jsxs)("tr",{className:"m-0 border-t p-0 even:bg-muted",children:[(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"bucketName"})}),(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"string"})}),(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"null"})}),(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:"The name of the Supabase Storage bucket to upload to"})]}),(0, e.jsxs)("tr",{className:"m-0 border-t p-0 even:bg-muted",children:[(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"path"})}),(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"string"})}),(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"null"})}),(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:"The path or subfolder to upload the file to"})]}),(0, e.jsxs)("tr",{className:"m-0 border-t p-0 even:bg-muted",children:[(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"allowedMimeTypes"})}),(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"string[]"})}),(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"[]"})}),(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:"The MIME types to allow for upload"})]}),(0, e.jsxs)("tr",{className:"m-0 border-t p-0 even:bg-muted",children:[(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"maxFiles"})}),(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"number"})}),(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"1"})}),(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:"Maximum number of files to upload"})]}),(0, e.jsxs)("tr",{className:"m-0 border-t p-0 even:bg-muted",children:[(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"maxFileSize"})}),(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"number"})}),(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"1000"})}),(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:"Maximum file size in bytes"})]})]})]})}),(0, e.jsxs)("h2",{className:"font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0",id:"further-reading",children:[(0, e.jsx)(w,{id:"further-reading"})," Further reading"]}),(0, e.jsxs)("ul",{className:"my-6 ml-6 list-disc text-foreground/70",children:[(0, e.jsx)("li",{className:"mt-2",children:(0, e.jsx)("a",{className:"text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-primary hover:decoration-2",href:"https://supabase.com/docs/guides/storage/buckets/creating-buckets",children:"Creating buckets"})}),(0, e.jsx)("li",{className:"mt-2",children:(0, e.jsx)("a",{className:"text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-primary hover:decoration-2",href:"https://supabase.com/docs/guides/storage/security/access-control",children:"Access control"})}),(0, e.jsx)("li",{className:"mt-2",children:(0, e.jsx)("a",{className:"text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-primary hover:decoration-2",href:"https://supabase.com/docs/guides/storage/uploads/standard-uploads",children:"Standard uploads"})})]})]})})]}),(0, e.jsx)("div",{className:"hidden text-sm xl:block",children:(0, e.jsx)("div",{className:"sticky top-16 -mt-10 pt-4",children:(0, e.jsx)("div",{className:"sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] py-12",children:(0, e.jsxs)("div",{className:"space-y-2",children:[(0, e.jsx)("p",{className:"font-medium text-muted-foreground",children:"On This Page"}),(0, e.jsx)("ul",{className:"m-0 list-none",children:d.map(t=>(0, e.jsx)("li",{className:"mt-0 pt-2",children:(0, e.jsx)("a",{href:"#"+t.id,className:"inline-block no-underline transition-colors hover:text-foreground text-muted-foreground",children:t.title})},t.id))})]})})})})]})}
export{h as DropzoneDocPage};//# sourceMappingURL=chunk-B4BxwuPn.js.map
