variable "domain" {
  type    = "string"
  default = "pinkpincho.com"
}

variable "domain_www" {
  type    = "string"
  default = "www.pinkpincho.com"
}

variable "domain_api" {
  type    = "string"
  default = "api.pinkpincho.com"
}

variable "access_key" {}
variable "secret_key" {}

variable "region" {
  default = "us-east-1"
}

provider "aws" {
  region     = "${var.region}"
  secret_key = "${var.secret_key}"
  access_key = "${var.access_key}"
}

resource "aws_s3_bucket" "pinkpincho" {
  bucket = "${var.domain}"
  acl    = "public-read"

  website {
    index_document = "index.html"
  }
}

resource "aws_s3_bucket" "pinkpincho_www" {
  bucket = "${var.domain_www}"
  acl    = "public-read"

  website {
    redirect_all_requests_to = "${var.domain}"
  }
}

resource "aws_s3_bucket" "pinkpincho-resources" {
  bucket = "pinkpicho-resources"
}

resource "aws_route53_zone" "pinkpincho" {
  name = "${var.domain}"
}

resource "aws_route53_record" "zoho" {
  zone_id = "${aws_route53_zone.pinkpincho.zone_id}"
  ttl     = "300"
  name    = "zb15010077.pinkpincho.com"
  type    = "CNAME"
  records = ["zmverify.zoho.com"]
}

resource "aws_route53_record" "ten" {
  zone_id = "${aws_route53_zone.pinkpincho.zone_id}"
  ttl     = "14400"
  name    = "${var.domain}"
  type    = "MX"
  records = ["10 mx.zoho.com"]
}

resource "aws_route53_record" "twenty" {
  zone_id = "${aws_route53_zone.pinkpincho.zone_id}"
  ttl     = "14400"
  name    = "${var.domain}"
  type    = "MX"
  records = ["20 mx2.zoho.com"]
}
