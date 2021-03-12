package com.example.onlineexam;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.Toast;

public class webpage extends AppCompatActivity implements View.OnClickListener {
    Button start;
    WebView website;
String site = "https://testwebcamera.blogspot.com/2020/12/vivek-dhiman.html";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_webpage);
        start = findViewById(R.id.start);

        website = findViewById(R.id.website);


        start.setOnClickListener(this);




    }

    @Override
    public void onClick(View v) {
        if(v==start){
            website.loadUrl(site);
            Toast.makeText(this, "Wait for 2 Second", Toast.LENGTH_SHORT).show();
        }
    }
}