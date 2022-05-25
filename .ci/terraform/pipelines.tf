resource "heroku_pipeline" "pipeline" {
  name = "httpd"
}

resource "heroku_pipeline_coupling" "production" {
  app      = heroku_app.production.id
  pipeline = heroku_pipeline.pipeline.id
  stage    = "production"
}
