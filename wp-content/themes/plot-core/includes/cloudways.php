<?php

class PlotCloudways {

	private $accessToken 	= null;
	private $email 			= "developer@projectsimply.com";
	private $key 			= "5koOKTGzpjSK1gfq0I4gHYAcE1PkV9";
	private $plotServer 	= 409695;

	function __construct() {

		//Fetch Access Token
		$tokenResponse = $this->callCloudwaysAPI('POST', '/oauth/access_token', null
		    , [
		    'email' => $this->email
		    , 'api_key' => $this->key
		    ]);
		$this->accessToken = $tokenResponse->access_token;

	}
	/**
	 * 
	 * @param string $method GET|POST|PUT|DELETE
	 * @param string $url relative URL for the call
	 * @param string $accessToken Access token generated using OAuth Call
	 * @param type $post Optional post data for the call
	 * @return object Output from CW API
	 */
	function callCloudwaysAPI($method, $url, $accessToken, $post = [])
	{
	    $baseURL = 'https://api.cloudways.com/api/v1';

	    $ch = curl_init();
	    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
	    curl_setopt($ch, CURLOPT_URL, $baseURL . $url);
	    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	    //curl_setopt($ch, CURLOPT_HEADER, 1);
	    //Set Authorization Header
	    if ($accessToken) {
	        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Authorization: Bearer ' . $accessToken]);
	    }

	    //Set Post Parameters
	    $encoded = '';
	    if (count($post)) {
	        foreach ($post as $name => $value) {
	        	if(is_array($value)) {
	        		$readyValue = '';
	        		foreach($value as $e) :
	        			$readyValue .= "$name" . "[]=$e&";
	        		endforeach;
	        		$encoded .= $readyValue . '&';
	        	} else {
	        		$encoded .= urlencode($name) . '=' . urlencode($value) . '&';
	        	}
	            
	        }
	        $encoded = substr($encoded, 0, strlen($encoded) - 1);

	        curl_setopt($ch, CURLOPT_POSTFIELDS, $encoded);
	        curl_setopt($ch, CURLOPT_POST, 1);
	    }

	    $output = curl_exec($ch);

	    $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	    if ($httpcode != '200') {
	    	return ['success' => false,'response'=> json_decode($output)];
	    }
	    curl_close($ch);
	    return json_decode($output);
	}

	function getServers() {

		$response = $this->callCloudwaysAPI('GET', '/server', $this->accessToken);
		return ['success' => true,$response];

	}

	function setAliases($domains) {
		$postData = [
			'app_id' 		=> CLOUDWAYS_APP_ID,
			'server_id' 	=> $this->plotServer,
			'aliases'		=> $domains
		];

		return $this->callCloudwaysAPI('POST', '/app/manage/aliases', $this->accessToken,$postData);
	}

	function installSSL($email='',$domain='') {
		$postData = [
			'app_id' 			=> CLOUDWAYS_APP_ID,
			'server_id' 		=> $this->plotServer,
			'ssl_domains'		=> $domains
		];

		return $this->callCloudwaysAPI('POST', '/security/lets_encrypt_install', $this->accessToken,$postData);
	}

}

