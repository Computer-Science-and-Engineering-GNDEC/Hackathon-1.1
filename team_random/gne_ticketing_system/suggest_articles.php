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

/* Get all the required files and functions */
require(HESK_PATH . 'hesk_settings.inc.php');
require(HESK_PATH . 'inc/common.inc.php');
hesk_load_database_functions();

/* Print XML header */
header('Content-Type: text/html; charset='.$hesklang['ENCODING']);

/* Get the search query composed of the subject and message */
$query = hesk_REQUEST('q') or die('');

hesk_dbConnect();

/* Get relevant articles from the database */
$res = hesk_dbQuery("SELECT t1.`id`, t1.`subject`, LEFT(t1.`content`, ".max(200, $hesk_settings['kb_substrart'] * 2).") AS `content`, MATCH(`subject`,`content`,`keywords`) AGAINST ('".hesk_dbEscape($query)."') AS `score`
					FROM `".hesk_dbEscape($hesk_settings['db_pfix']).'kb_articles` AS t1
					LEFT JOIN `'.hesk_dbEscape($hesk_settings['db_pfix'])."kb_categories` AS t2 ON t1.`catid` = t2.`id`
					WHERE t1.`type`='0' AND t2.`type`='0' AND MATCH(`subject`,`content`,`keywords`) AGAINST ('".hesk_dbEscape($query)."')
					LIMIT ".intval($hesk_settings['kb_search_limit']));
$num = hesk_dbNumRows($res);

$articles = array();
/* Return found articles */
$max_score = 0;

while ($article = hesk_dbFetchAssoc($res))
{
    if ($article['score'] > $max_score)
    {
        $max_score = $article['score'];
    }

    if ($max_score && ($article['score'] / $max_score) < 0.25)
    {
        break;
    }

    $txt = strip_tags($article['content']);
    if (hesk_mb_strlen($txt) > $hesk_settings['kb_substrart'])
    {
        $txt = hesk_mb_substr($txt, 0, $hesk_settings['kb_substrart']).'...';
    }

    $articles[] = array(
        'id' => $article['id'],
        'subject' => $article['subject'],
        'contentPreview' => $txt,
        'hiddenInputValue' => $article['id'].'|'.stripslashes( hesk_input($article['subject']) )
    );
}

print json_encode($articles);
