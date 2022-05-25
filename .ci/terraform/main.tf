terraform {
  backend "remote" {
    organization = "ashenm"
    workspaces {
      name = "httpd"
    }
  }
}

provider "heroku" {
  email   = var.heroku_email
  api_key = var.heroku_api_key
}

resource "heroku_app" "production" {
  acm                   = false
  buildpacks            = ["heroku/nodejs"]
  config_vars           = var.configuration
  internal_routing      = false
  name                  = "ashenm"
  region                = "us"
  sensitive_config_vars = var.secrets
  stack                 = "heroku-20"
}
