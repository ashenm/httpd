variable "configuration" {
  type    = map(any)
  default = {}
}

variable "heroku_api_key" {
  type = string
}

variable "heroku_email" {
  type = string
}

variable "secrets" {
  type      = map(any)
  sensitive = true
  default   = {}
}
