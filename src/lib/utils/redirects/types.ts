export interface RedirectOption {
  paths: string[]
  when: boolean
  to: string
}

export interface RedirectsConfig {
  url: string
  options: RedirectOption[]
}
