package com.example.onlineexam;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;

public class web extends AppCompatActivity implements View.OnClickListener {
    WebView url;

    Button open;

    String data ="<html><body>"+
            "<h1>WE ARE WINNERS</h1>"+
            "</body></html>";

    String web = "https://github.com/Computer-Science-and-Engineering-GNDEC/Hackathon-1.1/blob/main/tech_geekers/team.md/";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_web);


        open = findViewById(R.id.open);

        url = findViewById(R.id.url);

        open.setOnClickListener(this);






    }

    @Override
    public void onClick(View v) {

        if (v == open) {

            url.loadData(data, "text/html", "UTF-8");


            url.loadUrl(web);
        }

    }

    @Override
    public void onPointerCaptureChanged(boolean hasCapture) {

    }
}