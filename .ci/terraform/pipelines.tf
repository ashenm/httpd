resource "heroku_pipeline" "pipeline" {
  name = "httpd"
}

resource "heroku_pipeline_coupling" "staging" {
  app      = heroku_app.staging.id
  pipeline = heroku_pipeline.pipeline.id
  stage    = "staging"
}

resource "heroku_pipeline_coupling" "production" {
  app      = heroku_app.production.id
  pipeline = heroku_pipeline.pipeline.id
  stage    = "production"
}
