<?php
/**
 *
 * This file is part of HESK - PHP Help Desk Software.
 *
 * (c) Copyright Klemen Stirn. All rights reserved.
 * https://www.hesk.com
 *
 * For the full copyright and license agreement information visit
 * https://www.hesk.com/eula.php
 *
 */

define('IN_SCRIPT',1);
define('HESK_PATH','./');

// Get all the required files and functions
require(HESK_PATH . 'hesk_settings.inc.php');
require(HESK_PATH . 'inc/common.inc.php');

// Feature enabled?
if ( ! $hesk_settings['detect_typos'])
{
	die('');
}

// Print XML header
header('Content-Type: text/html; charset='.$hesklang['ENCODING']);
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

// Get the search query composed of the subject and message
$address = hesk_REQUEST('e') or die('');
$email_field = hesk_REQUEST('ef') or die('');
$display_div = hesk_REQUEST('dd') or die('');
$div = 1;

$suggestions = array();
// Do we allow multiple emails? If yes, check all
if ($hesk_settings['multi_eml'] || hesk_REQUEST('am'))
{
	// Make sure the format is correct
	$address = preg_replace('/\s/','',$address);
	$address = str_replace(';',',',$address);

	// Loops through emails and check for typos
	$div = 1;
	$all = explode(',',$address);
	foreach ($all as $address)
	{
		if ( ($suggest = hesk_emailTypo($address)) !== false )
		{
			$suggestions[] = hesk_emailTypoShow($address, $suggest, $div);
			$div++;
		}
	}
}
// If multiple emails are not allowed, check just first one
elseif ( ($suggest = hesk_emailTypo($address)) !== false )
{
	$suggestions[] = hesk_emailTypoShow($address, $suggest);
}

print json_encode($suggestions);
exit();


function hesk_emailTypoShow($address, $suggest, $div = '')
{
	global $hesk_settings, $hesklang, $email_field, $display_div;

	return array(
        'id' => "emailtypo{$display_div}{$div}",
        'suggestText' => sprintf($hesklang['didum'], str_replace('@', '@<b>', $suggest . '</b>')),
        'formattedSuggestedEmail' => addslashes($suggest),
        'originalAddress' => preg_quote($address, '/'),
        'noResponseText' => $hesklang['nole'],
        'yesResponseText' => $hesklang['yfix']
    );
} // END hesk_emailTypoShow()


function hesk_emailTypo($address)
{
	global $hesk_settings;

	// Remove anything more than a single address
	$address = str_replace(strstr($address,','),'',$address);
	$address = str_replace(strstr($address,';'),'',$address);
	$address = strtolower(trim($address));

	// Get email domain
    $domain = substr(strrchr($address, '@'), 1);

	// If no domain return false
	if ( ! $domain)
    {
    	return false;
    }

	// If we have an exact match return false
    if ( in_array($domain, $hesk_settings['email_providers']) )
    {
    	return false;
    }


	$shortest = -1;
    $closest  = '';

	foreach ($hesk_settings['email_providers'] as $provider)
    {
		$similar =  levenshtein($domain, $provider, 2, 1, 3);

		if ($similar < 1)
        {
        	return false;
        }

	    if ($similar < $shortest || $shortest < 0)
        {
	        $closest  = $provider;
	        $shortest = $similar;
	    }
    }

    if ($shortest < 4)
    {
    	return str_replace($domain, $closest, $address);
    }
    else
    {
    	return false;
    }
}  // END hesk_emailTypo()
?>
