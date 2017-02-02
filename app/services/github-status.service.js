'use strict';

GithubStatusService.$inject = ['$http', '$sce'];

function GithubStatusService($http, $sce) {
    var _this = this,
        _ghUrl = $sce.trustAsResourceUrl(
          'https://status.github.com/api/status.json'
        );

    _this.getStatus = function getStatus() {
        return $http({
            method: 'jsonp',
            url: _ghUrl,
            transformResponse: appendTransform($http.defaults.transformResponse, function(value) {
                return (value.status === 'good');
            })
        });
    };
}

function appendTransform(defaults, transform) {
  defaults = angular.isArray(defaults) ? defaults : [defaults];
  return defaults.concat(transform);
}

module.exports = GithubStatusService;
